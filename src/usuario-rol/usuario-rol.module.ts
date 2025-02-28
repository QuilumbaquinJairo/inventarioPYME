import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRol } from './usuario-rol.entity';
import { UsuarioRolService } from './usuario-rol.service';
import { UsuarioRolController } from './usuario-rol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRol])], // ✅ Register UsuarioRolRepository
  controllers: [UsuarioRolController],
  providers: [UsuarioRolService],
  exports: [UsuarioRolService, TypeOrmModule], // ✅ Export TypeOrmModule so others can use UsuarioRolRepository
})
export class UsuarioRolModule {}
