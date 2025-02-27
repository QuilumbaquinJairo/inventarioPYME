import { Controller, Post, Get, Param,Put,Delete, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async getAllUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.findAllUsuarios();
  }
  
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.createUsuario(createUsuarioDto);
  }
  /**
   * 🟢 Update an existing user.
   */
  @Put(':id')
  
  async updateUsuario(@Param('id') id: number, @Body() dto: UpdateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.updateUsuario(id, dto);
  }

  /**
   * 🟢 Delete an existing user.
   */
  @Delete(':id')
  
  async deleteUsuario(@Param('id') id: number): Promise<{ message: string }> {
    await this.usuarioService.deleteUsuario(id);
    return { message: `User with ID ${id} deleted successfully.` };
  }
}
