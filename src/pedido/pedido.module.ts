import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';
import { Empresa } from '../empresa/empresa.entity';
import { Producto } from '../producto/producto.entity';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { DetallePedidoModule } from '../detalle-pedido/detalle-pedido.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, DetallePedido, Empresa, Producto]), DetallePedidoModule], // ✅ Include DetallePedido
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}
