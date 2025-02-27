import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Empresa } from '../empresa/empresa.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    public readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
      relations: ['empresa', 'roles'], // Include related data
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
  async createUsuario(dto: CreateUsuarioDto): Promise<Usuario> {
    // 🔍 Check if email already exists
    const existingUser = await this.usuarioRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException(`❌ The email "${dto.email}" is already registered.`);
    }

    let empresa;
    if (dto.id_empresa) {
      empresa = await this.empresaRepository.findOne({
        where: { id_empresa: dto.id_empresa },
      });
      if (!empresa) {
        throw new BadRequestException(`❌ Empresa with ID ${dto.id_empresa} not found.`);
      }
    }

    // ✅ Ensure password exists and hash it
    if (!dto.password) {
        throw new BadRequestException(`❌ Password is required.`);
    }
    
    const hashedPassword = await bcrypt.hash(dto.password, 10); // ✅ Secure password hashing

    // ✅ Create new user
    const newUser = this.usuarioRepository.create({
      nombre_completo: dto.nombre_completo,
      email: dto.email,
      telefono: dto.telefono,
      password_hash: hashedPassword, // ✅ Correctly store the hashed password
      empresa, // 🔥 Use relation, not `id_empresa`
    });

    return this.usuarioRepository.save(newUser);
}

  async updateUsuario(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({ where: { id_usuario: id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    if (dto.password) {
      user.password_hash = await bcrypt.hash(dto.password, 10);
      delete dto.password; 
    }

    Object.assign(user, dto);

    return await this.usuarioRepository.save(user);
  }

  async deleteUsuario(id: number): Promise<void> {
    const user = await this.usuarioRepository.findOne({ where: { id_usuario: id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    try {
      await this.usuarioRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(`Cannot delete user with ID ${id}, it may be linked to other records.`);
    }
  }

  async findAllUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: ['empresa', 'roles'], // ✅ Fetch related data
      order: { fecha_creacion: 'DESC' }, // ✅ Sort by newest users first
    });
  }
  
}
