import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

class EmpresaDto {
  @IsNumber()
  @IsNotEmpty()
  id_empresa: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  ruc: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  email_contacto: string;

  @IsString()
  @IsNotEmpty()
  sector: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_creacion: string;

  @IsBoolean()
  @IsNotEmpty()
  estado: boolean;
}

class ProductoStockDto {
  @IsNumber()
  @IsNotEmpty()
  id_producto: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  stock_minimo: number;

  @IsNumber()
  @IsNotEmpty()
  stock_maximo: number;
}

export class InventarioResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id_inventario: number;

  empresa: EmpresaDto;

  @IsDateString()
  @IsNotEmpty()
  fecha_actualizacion: string;

  productos_stock: ProductoStockDto[];
}
