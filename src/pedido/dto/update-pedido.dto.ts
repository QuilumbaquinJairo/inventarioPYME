import { IsDateString, IsEnum, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class UpdatePedidoDetalleDto {
  @IsNumber()
  id_producto: number;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  precio_unitario: number;
}

export class UpdatePedidoDto {
  @IsDateString()
  @IsOptional()
  fecha_entrega?: Date;

  @IsEnum(['pendiente', 'entregado', 'cancelado'])
  estado: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePedidoDetalleDto)
  detalles: UpdatePedidoDetalleDto[];
}
