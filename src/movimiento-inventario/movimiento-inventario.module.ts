import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoInventario } from './movimiento-inventario.entity';
import { MovimientoInventarioService } from './movimiento-inventario.service';
import { MovimientoInventarioController } from './movimiento-inventario.controller';
import { Producto } from '../producto/producto.entity';
import { Inventario } from '../inventario/inventario.entity';  
import { InventarioModule } from '../inventario/inventario.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoInventario, Producto, Inventario]),InventarioModule],
  providers: [MovimientoInventarioService],
  controllers: [MovimientoInventarioController],
  exports: [MovimientoInventarioService],
})
export class MovimientoInventarioModule {}
