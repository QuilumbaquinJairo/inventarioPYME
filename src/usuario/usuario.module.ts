import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Empresa } from '../empresa/empresa.entity'; // ✅ Import Empresa
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { EmpresaModule } from '../empresa/empresa.module';
import { RolModule } from '../rol/rol.module';
import { UsuarioRolModule } from '../usuario-rol/usuario-rol.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), // ✅ Load UsuarioRepository
    EmpresaModule, 
    RolModule,
    UsuarioRolModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
