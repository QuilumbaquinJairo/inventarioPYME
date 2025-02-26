import { Injectable, BadRequestException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { Categoria } from '../categoria/categoria.entity';
import { Empresa } from '../empresa/empresa.entity';
import { Proveedor } from '../proveedor/proveedor.entity';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async createProducto(dto: CreateProductoDto): Promise<Producto> {
    // 🔍 Check if barcode already exists
    const existingProduct = await this.productoRepository.findOne({
      where: { codigo_barras: dto.codigo_barras },
    });

    if (existingProduct) {
      throw new BadRequestException(`The barcode "${dto.codigo_barras}" is already registered.`);
    }

    // 🔍 Validate related entities
    const categoria = await this.categoriaRepository.findOne({ where: { id_categoria: dto.id_categoria } });
    if (!categoria) {
      throw new BadRequestException(`Categoria with ID ${dto.id_categoria} not found.`);
    }

    const empresa = await this.empresaRepository.findOne({ where: { id_empresa: dto.id_empresa } });
    if (!empresa) {
      throw new BadRequestException(`Empresa with ID ${dto.id_empresa} not found.`);
    }

    let proveedor;
    if (dto.id_proveedor) {
      proveedor = await this.proveedorRepository.findOne({ where: { id_proveedor: dto.id_proveedor } });
      if (!proveedor) {
        throw new BadRequestException(`Proveedor with ID ${dto.id_proveedor} not found.`);
      }
    }

    // ✅ Create new product
    const newProduct = this.productoRepository.create({
      ...dto,
      categoria,
      empresa,
      proveedor,
    });

    return this.productoRepository.save(newProduct);
  }

  async getProductos(
    limit?: number,
    offset?: number,
    categoriaId?: number,
    empresaId?: number,
    minPrecio?: number,
    maxPrecio?: number
  ): Promise<{ data: Producto[]; total: number }> {
    const queryBuilder = this.productoRepository.createQueryBuilder('producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .leftJoinAndSelect('producto.empresa', 'empresa')
      .leftJoinAndSelect('producto.proveedor', 'proveedor');

    
    if (categoriaId) queryBuilder.andWhere('producto.id_categoria = :categoriaId', { categoriaId });
    if (empresaId) queryBuilder.andWhere('producto.id_empresa = :empresaId', { empresaId });
    if (minPrecio) queryBuilder.andWhere('producto.precio_venta >= :minPrecio', { minPrecio });
    if (maxPrecio) queryBuilder.andWhere('producto.precio_venta <= :maxPrecio', { maxPrecio });

    if (limit) queryBuilder.take(limit);
    if (offset) queryBuilder.skip(offset);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  async getProductoById(id: number): Promise<Producto> {
    const product = await this.productoRepository.findOne({
      where: { id_producto: id },
      relations: ['categoria', 'empresa', 'proveedor'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return product;
  }
  async updateProducto(id: number, dto: UpdateProductoDto): Promise<Producto> {
    const product = await this.productoRepository.findOne({
      where: { id_producto: id },
      relations: ['categoria', 'empresa', 'proveedor'],
    });

    if (!product) {
      throw new NotFoundException(`🚨 Product with ID ${id} not found.`);
    }

    // 🔍 Check if a different product already has this barcode
    if (dto.codigo_barras && dto.codigo_barras !== product.codigo_barras) {
      const existingProduct = await this.productoRepository.findOne({ where: { codigo_barras: dto.codigo_barras } });
      if (existingProduct) {
        throw new BadRequestException(`Product with barcode "${dto.codigo_barras}" already exists.`);
      }
    }

    // 🔍 Validate relations (category, company, supplier)
    const categoria = dto.id_categoria ? await this.categoriaRepository.findOne({ where: { id_categoria: dto.id_categoria } }) : product.categoria;
    const empresa = dto.id_empresa ? await this.empresaRepository.findOne({ where: { id_empresa: dto.id_empresa } }) : product.empresa;
    const proveedor = dto.id_proveedor ? await this.proveedorRepository.findOne({ where: { id_proveedor: dto.id_proveedor } }) : product.proveedor;

    if (!empresa) {
      throw new BadRequestException(`Company with ID ${dto.id_empresa} does not exist.`);
    }

    // ✅ Update product details
    Object.assign(product, {
      ...dto,
      categoria,
      empresa,
      proveedor,
      ultima_actualizacion: new Date(),
    });

    return this.productoRepository.save(product);
  }
  async deleteProducto(id: number): Promise<void> {
    const product = await this.productoRepository.findOne({ where: { id_producto: id } });

    if (!product) {
      throw new NotFoundException(`🚨 Product with ID ${id} not found.`);
    }

    try {
      await this.productoRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(`❌ Cannot delete product with ID ${id}, it may be linked to other records.`);
    }
  }
}
