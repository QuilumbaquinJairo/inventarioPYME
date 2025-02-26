import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInventarioDto {
  @IsNumber()
  @IsNotEmpty()
  id_empresa: number;
}
