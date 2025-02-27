import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Empresa } from '../empresa/empresa.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Producto } from '../producto/producto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,

    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,

    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async getAllPedidos(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      relations: ['empresa'], // ✅ Fetch related company information
    });
  }
  async getPedidoById(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id_pedido: id },
      relations: ['empresa', 'detalles', 'detalles.producto'], // ✅ Now this works
    });
  
    if (!pedido) {
      throw new NotFoundException(`Pedido with ID ${id} not found.`);
    }
  
    return pedido;
  }
  

  async createPedido(dto: CreatePedidoDto): Promise<Pedido> {
    // ✅ Validate that the empresa exists
    const empresa = await this.empresaRepository.findOne({ where: { id_empresa: dto.id_empresa } });
    if (!empresa) {
      throw new NotFoundException(`Empresa with ID ${dto.id_empresa} not found.`);
    }
  
    // ✅ Create Pedido entity
    const newPedido = this.pedidoRepository.create({
      empresa,
      fecha_entrega: dto.fecha_entrega,
      estado: dto.estado,
    });
    const savedPedido = await this.pedidoRepository.save(newPedido);
  
    // ✅ Define `detalles` with correct type
    const detalles: DetallePedido[] = []; // 🔥 Fix applied
  
    // ✅ Save Pedido details
    for (const detalle of dto.detalles) {
      const producto = await this.productoRepository.findOne({ where: { id_producto: detalle.id_producto } });
      if (!producto) {
        throw new NotFoundException(`Producto with ID ${detalle.id_producto} not found.`);
      }
  
      const newDetalle = this.detallePedidoRepository.create({
        pedido: savedPedido,
        producto,
        cantidad: detalle.cantidad,
        precio_unitario: detalle.precio_unitario,
      });
  
      detalles.push(newDetalle); // ✅ Now this works correctly
    }
  
    await this.detallePedidoRepository.save(detalles);
  
    return savedPedido;
  }
  async updatePedido(id: number, dto: UpdatePedidoDto): Promise<Pedido> {
    // ✅ Check if the order exists
    const pedido = await this.pedidoRepository.findOne({ where: { id_pedido: id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido with ID ${id} not found.`);
    }
  
    // ✅ Update order fields
    if (dto.fecha_entrega) pedido.fecha_entrega = dto.fecha_entrega;
    if (dto.estado) pedido.estado = dto.estado;
  
    await this.pedidoRepository.save(pedido);
  
    // ✅ Update order details (if provided)
    if (dto.detalles && dto.detalles.length > 0) {
      // Remove existing details
      await this.detallePedidoRepository.delete({ pedido });
  
      // ✅ Fix: Define correct type for `detalles`
      const detalles: DetallePedido[] = []; // 🔥 Fix applied
  
      // Add updated details
      for (const detalle of dto.detalles) {
        const producto = await this.productoRepository.findOne({ where: { id_producto: detalle.id_producto } });
        if (!producto) {
          throw new NotFoundException(`Producto with ID ${detalle.id_producto} not found.`);
        }
  
        const newDetalle = this.detallePedidoRepository.create({
          pedido,
          producto,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
        });
  
        detalles.push(newDetalle); // ✅ No more TypeScript error
      }
  
      await this.detallePedidoRepository.save(detalles);
    }
  
    // ✅ Fix: Ensure the return type is `Pedido`
    return this.pedidoRepository.findOneOrFail({ where: { id_pedido: id } });
  }

  async deletePedido(id: number): Promise<{ message: string }> {
    // ✅ Check if the order exists
    const pedido = await this.pedidoRepository.findOne({ where: { id_pedido: id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido with ID ${id} not found.`);
    }

    try {
      // ✅ First, delete associated order details
      await this.detallePedidoRepository.delete({ pedido });

      // ✅ Then, delete the order itself
      await this.pedidoRepository.delete(id);
      
      return { message: `Pedido with ID ${id} deleted successfully.` };
    } catch (error) {
      throw new BadRequestException(`Cannot delete Pedido with ID ${id}, it may be linked to other records.`);
    }
  }
  
}
