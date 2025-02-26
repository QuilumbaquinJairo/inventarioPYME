import { IsString, IsNumber, IsNotEmpty, IsOptional, IsDecimal } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  codigo_barras: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  id_categoria: number;

  @IsDecimal()
  precio_compra: number;

  @IsDecimal()
  precio_venta: number;

  @IsNumber()
  stock_minimo: number;

  @IsNumber()
  stock_maximo: number;

  @IsNumber()
  id_empresa: number;

  @IsOptional()
  @IsNumber()
  id_proveedor?: number;
}
