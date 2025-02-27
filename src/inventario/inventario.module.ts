import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './inventario.entity';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { Empresa } from '../empresa/empresa.entity';
import { EmpresaModule } from '../empresa/empresa.module'; // ✅ Import EmpresaModule
import { Producto } from '../producto/producto.entity';
import { MovimientoInventario } from 'src/movimiento-inventario/movimiento-inventario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventario,Empresa, Producto,MovimientoInventario]),
    EmpresaModule, // ✅ This ensures EmpresaRepository is available
  ],
  controllers: [InventarioController],
  providers: [InventarioService],
  exports: [InventarioService], // ✅ Export service in case other modules need it
})
export class InventarioModule {}
