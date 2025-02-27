import { IsNotEmpty, IsNumber, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMovimientoDto {
  @IsNotEmpty()
  @IsNumber()
  id_inventario: number;

  @IsNumber()
  @IsNotEmpty()
  id_producto: number;

  @IsEnum(['entrada', 'salida', 'ajuste'])
  tipo_movimiento: 'entrada' | 'salida' | 'ajuste';

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;

  @IsOptional()
  @IsNumber()
  costo_unitario?: number;

  @IsOptional()
  @IsString()
  motivo?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsNumber()
  id_usuario?: number;
}
