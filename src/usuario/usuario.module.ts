import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Empresa } from '../empresa/empresa.entity'; // ✅ Import Empresa
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { EmpresaModule } from '../empresa/empresa.module'; // ✅ Import EmpresaModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), // ✅ Load UsuarioRepository
    EmpresaModule, // ✅ Import EmpresaModule so EmpresaRepository is available
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
