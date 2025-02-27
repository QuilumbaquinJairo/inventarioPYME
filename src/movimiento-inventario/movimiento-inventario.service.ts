import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Between, FindOptionsWhere } from 'typeorm';
import { MovimientoInventario } from './movimiento-inventario.entity';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { Producto } from '../producto/producto.entity';
import { Inventario } from '../inventario/inventario.entity';

@Injectable()
export class MovimientoInventarioService {
  constructor(
    @InjectRepository(MovimientoInventario)
    private readonly movimientoRepository: Repository<MovimientoInventario>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>, // ✅ Add reference to Inventario
  ) {}

  async registrarMovimiento(dto: CreateMovimientoDto): Promise<MovimientoInventario> {
    const producto = await this.productoRepository.findOne({ where: { id_producto: dto.id_producto } });
    if (!producto) throw new NotFoundException(`Producto con ID ${dto.id_producto} no encontrado.`);
  
    // ✅ Prevent stock from becoming negative
    if (dto.tipo_movimiento === 'salida' && dto.cantidad > producto.stock_actual) {
      throw new BadRequestException(`No puedes retirar más stock del disponible. ${producto.stock_actual} + ${producto.nombre}`);
    }
    const inventario = await this.inventarioRepository.findOne({ where: { id_inventario: dto.id_inventario } });
    if (!inventario) {
        throw new NotFoundException(`Inventario con ID ${dto.id_inventario} no encontrado.`);
    }
  
    // ✅ Register the movement
    const movimiento = this.movimientoRepository.create({
      ...dto,
      inventario,
      producto,
    });
  
    await this.movimientoRepository.save(movimiento);
  
    // ✅ Update stock in Producto (NOT Inventario)
    if (dto.tipo_movimiento === 'entrada') {
      producto.stock_actual += dto.cantidad;
    } else if (dto.tipo_movimiento === 'salida') {
      producto.stock_actual -= dto.cantidad;
    }
  
    await this.productoRepository.save(producto);
  
    return movimiento;
  }

  async findMovimientoById(id: number): Promise<MovimientoInventario> {
    const movimiento = await this.movimientoRepository.findOne({
      where: { id_movimiento: id },
      relations: ['inventario', 'producto', 'usuario'], // ✅ Fetch related entities
    });
  
    if (!movimiento) {
      throw new NotFoundException(`Movimiento con ID ${id} no encontrado.`);
    }
  
    return movimiento;
  }

  async findAllMovimientos(): Promise<MovimientoInventario[]> {
    return this.movimientoRepository.find({
      relations: ['inventario', 'producto', 'usuario'], // ✅ Fetch related entities
      order: { fecha_movimiento: 'DESC' }, // ✅ Sort by most recent movements
    });
  }
  async findFilteredMovimientos(
    startDate?: string,
    endDate?: string,
    tipo_movimiento?: string,
  ): Promise<MovimientoInventario[]> {
    const whereConditions: FindOptionsWhere<MovimientoInventario> = {};

    // ✅ Filter by date range if both startDate and endDate are provided
    if (startDate && endDate) {
      whereConditions.fecha_movimiento = Between(new Date(startDate), new Date(endDate));
    }

    // ✅ Filter by movement type (if provided)
    if (tipo_movimiento) {
      whereConditions.tipo_movimiento = tipo_movimiento;
    }

    return this.movimientoRepository.find({
      where: whereConditions,
      relations: ['inventario', 'producto', 'usuario'], // ✅ Fetch related entities
      order: { fecha_movimiento: 'DESC' },
    });
  }
  
  
}
