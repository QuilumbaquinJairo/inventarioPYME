import { Controller, Post, Body,Put,Param,Delete,Get } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async createPedido(@Body() dto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.createPedido(dto);
  }
  
  @Get()
  async getAllPedidos(): Promise<Pedido[]> {
    return this.pedidoService.getAllPedidos();
  }
  @Get(':id')
  async getPedidoById(@Param('id') id: number): Promise<Pedido> {
    return this.pedidoService.getPedidoById(id);
  }

  @Put(':id')
  async updatePedido(@Param('id') id: number, @Body() dto: UpdatePedidoDto): Promise<Pedido> {
    return this.pedidoService.updatePedido(id, dto);
  }
  @Delete(':id')
  async deletePedido(@Param('id') id: number): Promise<{ message: string }> {
    return this.pedidoService.deletePedido(id);
  }
}
