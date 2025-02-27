import { Controller, Get, Param,Post,Put,Delete,Body } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { Inventario } from './inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { InventarioResponseDto } from './dto/inventario-response.dto';

@Controller('inventarios')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get(':id')
  async getInventarioById(@Param('id') id: number): Promise<InventarioResponseDto> {
    return this.inventarioService.findInventarioById(id);
  }

  @Get(':id/alertas')
  findLowStock(@Param('id') id: number) {
    return this.inventarioService.findLowStockProducts(+id);
  }

  @Post()
  async createInventario(@Body() dto: CreateInventarioDto): Promise<Inventario> {
    return this.inventarioService.createInventario(dto);
  }
  
  @Post(':id_inventario/producto/:id_producto')
  async addProduct(
    @Param('id_inventario') id_inventario: number,
    @Param('id_producto') id_producto: number,
    @Body('cantidad') cantidad: number,
  ) {
    return this.inventarioService.addProductToInventario(id_inventario, id_producto, cantidad);
  }

  @Put(':id')
  async updateInventario(@Param('id') id: number, @Body() dto: UpdateInventarioDto): Promise<Inventario> {
    return this.inventarioService.updateInventario(id, dto);
  }

  @Delete(':id')
  async deleteInventario(@Param('id') id: number): Promise<void> {
    return this.inventarioService.deleteInventario(id);
  }
}
