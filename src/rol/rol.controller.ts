import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  async getAllRoles(): Promise<Rol[]> {
    return this.rolService.findAll();
  }
}
