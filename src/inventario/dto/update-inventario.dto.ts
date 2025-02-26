import { IsNotEmpty, IsNumber,IsOptional,IsDateString } from 'class-validator';

export class UpdateInventarioDto {
  @IsNumber()
  @IsNotEmpty()
  id_empresa: number;

  @IsOptional()
  @IsDateString()
  fecha_actualizacion?: string;
}
