import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './inventario.entity';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { Empresa } from '../empresa/empresa.entity';
import { EmpresaModule } from '../empresa/empresa.module'; // ✅ Import EmpresaModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventario]),
    EmpresaModule, // ✅ This ensures EmpresaRepository is available
  ],
  controllers: [InventarioController],
  providers: [InventarioService],
  exports: [InventarioService], // ✅ Export service in case other modules need it
})
export class InventarioModule {}
