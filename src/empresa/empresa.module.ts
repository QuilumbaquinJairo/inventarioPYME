import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresa.entity';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])], // ✅ Load EmpresaRepository
  controllers: [EmpresaController],
  providers: [EmpresaService],
  exports: [EmpresaService, TypeOrmModule], // ✅ Export TypeOrmModule so other modules can use EmpresaRepository
})
export class EmpresaModule {}
