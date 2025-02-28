import { IsString, IsEmail, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre_completo: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 20)
  telefono: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  password: string;

  @IsOptional()
  id_empresa?: number;
  
  @IsOptional()
  id_roles?: number[];
}
