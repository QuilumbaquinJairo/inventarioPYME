import { Controller, Post, Body,Get,Param,Query } from '@nestjs/common';
import { MovimientoInventarioService } from './movimiento-inventario.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { MovimientoInventario } from './movimiento-inventario.entity';

@Controller('movimientos')
export class MovimientoInventarioController {
  constructor(private readonly movimientoService: MovimientoInventarioService) {}

  @Post()
  async registrarMovimiento(@Body() dto: CreateMovimientoDto): Promise<MovimientoInventario> {
    return this.movimientoService.registrarMovimiento(dto);
  }
  @Get('filter')
  async getFilteredMovimientos(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('tipo_movimiento') tipo_movimiento?: string,
  ): Promise<MovimientoInventario[]> {
    return this.movimientoService.findFilteredMovimientos(startDate, endDate, tipo_movimiento);
  }
  
  @Get(':id')
  async getMovimiento(@Param('id') id: number): Promise<MovimientoInventario> {
    return this.movimientoService.findMovimientoById(id);
  }

  @Get()
  async getAllMovimientos(): Promise<MovimientoInventario[]> {
    return this.movimientoService.findAllMovimientos();
  }

  
}
