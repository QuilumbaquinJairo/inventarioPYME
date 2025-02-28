import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Raw } from 'typeorm';
import { Inventario } from './inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Empresa } from '../empresa/empresa.entity';
import { InventarioResponseDto } from './dto/inventario-response.dto';
import { Producto } from '../producto/producto.entity';
import { MovimientoInventario } from '../movimiento-inventario/movimiento-inventario.entity';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
    @InjectRepository(Empresa) 
    private readonly empresaRepository: Repository<Empresa>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(MovimientoInventario)
    private readonly movimientoRepository: Repository<MovimientoInventario>,
  ) {}

  async findInventarioById(id: number): Promise<InventarioResponseDto> {
    const inventario = await this.inventarioRepository.findOne({
      where: { id_inventario: id },
      relations: ['empresa'], // ✅ Fetch the empresa relation
    });
  
    if (!inventario) {
      throw new NotFoundException(`Inventario with ID ${id} not found`);
    }
  
    // ✅ Fetch unique products that belong to the same empresa as the inventory
    const productos = await this.productoRepository.find({
      where: { empresa: { id_empresa: inventario.empresa.id_empresa } }, // ✅ Use relation filtering
      relations: ['empresa'], // ✅ Ensure empresa is fetched
    });
  
    // ✅ Format the response to include unique products
    const productosStock = productos.map(producto => ({
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      stock_minimo: producto.stock_minimo,
      stock_maximo: producto.stock_maximo,
      cantidad: producto.stock_actual, // ✅ Fetch actual stock directly
    }));
  
    return {
      id_inventario: inventario.id_inventario,
      empresa: {
        id_empresa: inventario.empresa.id_empresa,
        nombre: inventario.empresa.nombre,
        ruc: inventario.empresa.ruc,
        direccion: inventario.empresa.direccion,
        telefono: inventario.empresa.telefono,
        email_contacto: inventario.empresa.email_contacto,
        sector: inventario.empresa.sector,
        fecha_creacion: inventario.empresa.fecha_creacion.toISOString(),
        estado: inventario.empresa.estado,
      },
      fecha_actualizacion: inventario.fecha_actualizacion.toISOString(),
      productos_stock: productosStock, // ✅ No duplicates, correct stock
    };
  }

  async findLowStockProducts(id: number) {
    const inventario = await this.inventarioRepository.findOne({
      where: { id_inventario: id },
      relations: ['empresa'],
    });

    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado.`);
    }

    // ✅ Fetch products for this inventory
    const lowStockProducts = await this.productoRepository.find({
      where: {
        stock_actual: Raw(alias => `${alias} < stock_minimo`), // ✅ Fix comparison
        empresa: { id_empresa: inventario.empresa.id_empresa },
      },
    });

    return {
      id_inventario: inventario.id_inventario,
      empresa: {
        id_empresa: inventario.empresa.id_empresa,
        nombre: inventario.empresa.nombre,
      },
      productos_stock: lowStockProducts, // ✅ Only low-stock products
    };
  }

  async createInventario(dto: CreateInventarioDto): Promise<Inventario> {
    const newInventario = this.inventarioRepository.create({
        empresa: { id_empresa: dto.id_empresa } // Explicitly set the relation
    });

    return this.inventarioRepository.save(newInventario);
  }

  async updateInventario(id: number, dto: UpdateInventarioDto): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findOne({ where: { id_inventario: id } });

    if (!inventario) {
      throw new NotFoundException(`Inventario with ID ${id} not found`);
    }

    // ✅ Fetch the Empresa entity before assigning it
    if (dto.id_empresa) {
      const empresa = await this.empresaRepository.findOne({ where: { id_empresa: dto.id_empresa } });

      if (!empresa) {
        throw new NotFoundException(`Empresa with ID ${dto.id_empresa} not found`);
      }

      inventario.empresa = empresa; // ✅ Assign full entity
    }

    if (dto.fecha_actualizacion) {
      inventario.fecha_actualizacion = new Date(dto.fecha_actualizacion);
    }

    await this.inventarioRepository.save(inventario);

    return this.inventarioRepository.findOneOrFail({ where: { id_inventario: id } });
  }
  
  async deleteInventario(id: number): Promise<void> {
    const inventario = await this.findInventarioById(id);

    if (!inventario) {
      throw new NotFoundException(`Inventario with ID ${id} not found`);
    }

    try {
      await this.inventarioRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(`Cannot delete Inventario with ID ${id}, it may be linked to other records.`);
    }
  }

  async addProductToInventario(id_inventario: number, id_producto: number, cantidad: number): Promise<MovimientoInventario> {
    // ✅ Check if the inventory exists
    const inventario = await this.inventarioRepository.findOne({ where: { id_inventario } });
    if (!inventario) throw new NotFoundException(`Inventario con ID ${id_inventario} no encontrado.`);
  
    // ✅ Check if the product exists
    const producto = await this.productoRepository.findOne({ where: { id_producto } });
    if (!producto) throw new NotFoundException(`Producto con ID ${id_producto} no encontrado.`);
  
    // ✅ Create a movement (entrada - incoming stock)
    const movimiento = this.movimientoRepository.create({
      inventario,
      producto,
      tipo_movimiento: 'entrada', // ✅ Entry movement
      cantidad,
      fecha_movimiento: new Date(),
    });
  
    await this.movimientoRepository.save(movimiento);
  
    // ✅ Increase stock in Producto
    producto.stock_actual += cantidad;
    await this.productoRepository.save(producto);
  
    return movimiento;
  }

  async getStockTotalByInventario(id_inventario: number): Promise<number> {
    const inventario = await this.inventarioRepository.findOne({ where: { id_inventario } });

    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${id_inventario} no encontrado.`);
    }

    const totalStock = await this.productoRepository
      .createQueryBuilder('producto')
      .innerJoin('movimiento_inventario', 'mov', 'mov.id_producto = producto.id_producto')
      .where('mov.id_inventario = :id_inventario', { id_inventario })
      .select('SUM(producto.stock_actual)', 'totalStock')
      .getRawOne();

    return totalStock?.totalStock || 0;
  }

  async getStockTotalGlobal(): Promise<number> {
    const totalStock = await this.productoRepository
      .createQueryBuilder('producto')
      .select('SUM(producto.stock_actual)', 'totalStock')
      .getRawOne();

    return totalStock?.totalStock || 0;
  }
  
  async getAllInventarios(): Promise<Inventario[]> {
    return this.inventarioRepository.find({
      relations: ['empresa'], // Include Empresa details in the response
      order: { fecha_actualizacion: 'DESC' }, // Sort by latest updates
    });
  }
  

}
