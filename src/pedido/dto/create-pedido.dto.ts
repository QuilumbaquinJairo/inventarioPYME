import { IsNumber, IsDateString, IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PedidoDetalleDto {
  @IsNumber()
  id_producto: number;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  precio_unitario: number;
}

export class CreatePedidoDto {
  @IsNumber()
  id_empresa: number;

  @IsDateString()
  @IsOptional()
  fecha_entrega?: Date;

  @IsEnum(['pendiente', 'entregado', 'cancelado'])
  estado: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoDetalleDto)
  detalles: PedidoDetalleDto[];
}
