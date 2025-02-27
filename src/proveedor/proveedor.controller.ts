import { Controller, Get, Post, Put, Param, Body,Delete } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from './proveedor.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Controller('proveedores')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Get()
  async getAllProveedores(): Promise<Proveedor[]> {
    return this.proveedorService.findAllProveedores();
  }
  @Get(':id')
  async getProveedorById(@Param('id') id: number): Promise<Proveedor> {
    return this.proveedorService.getProveedorById(id);
  }
  @Post()
  async createProveedor(@Body() dto: CreateProveedorDto): Promise<Proveedor> {
    return this.proveedorService.createProveedor(dto);
  }

  @Put(':id')
  async updateProveedor(@Param('id') id: number, @Body() dto: UpdateProveedorDto): Promise<Proveedor> {
    return this.proveedorService.updateProveedor(id, dto);
  }
  @Delete(':id')
  async deleteProveedor(@Param('id') id: number): Promise<{ message: string }> {
    await this.proveedorService.deleteProveedor(id);
    return { message: `Proveedor with ID ${id} deleted successfully.` };
  }
}
