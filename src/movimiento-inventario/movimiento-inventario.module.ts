import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoInventario } from './movimiento-inventario.entity';
import { MovimientoInventarioService } from './movimiento-inventario.service';
import { MovimientoInventarioController } from './movimiento-inventario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoInventario])],
  providers: [MovimientoInventarioService],
  controllers: [MovimientoInventarioController],
  exports: [MovimientoInventarioService],
})
export class MovimientoInventarioModule {}
