import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Empresa } from '../empresa/empresa.entity';
import { InventarioResponseDto } from './dto/inventario-response.dto';


@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
    @InjectRepository(Empresa) 
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async findInventarioById(id: number): Promise<InventarioResponseDto> {
    const inventario = await this.inventarioRepository.findOne({
      where: { id_inventario: id },
      relations: ['empresa', 'movimientos', 'movimientos.producto'], // ✅ Fetch products via movements
    });
  
    if (!inventario) {
      throw new NotFoundException(`Inventario with ID ${id} not found`);
    }
  
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
      productos_stock: inventario.movimientos.map(movimiento => ({
        id_producto: movimiento.producto.id_producto,
        nombre: movimiento.producto.nombre,
        stock_minimo: movimiento.producto.stock_minimo,
        stock_maximo: movimiento.producto.stock_maximo,
        cantidad: movimiento.cantidad, // ✅ Now getting stock from movement
      })),
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
}
