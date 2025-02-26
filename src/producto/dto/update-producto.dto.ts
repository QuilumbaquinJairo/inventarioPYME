import { IsOptional, IsNumber, IsString, Min } from 'class-validator';

export class UpdateProductoDto {
  @IsString()
  @IsOptional()
  codigo_barras?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  precio_compra?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  precio_venta?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock_minimo?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock_maximo?: number;

  @IsNumber()
  @IsOptional()
  id_empresa?: number;

  @IsNumber()
  @IsOptional()
  id_categoria?: number;

  @IsNumber()
  @IsOptional()
  id_proveedor?: number;
}
