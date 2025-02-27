import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateProveedorDto {
  @IsString()
  @IsOptional()
  @Length(3, 100)
  nombre?: string;

  @IsString()
  @IsOptional()
  @Length(3, 100)
  contacto?: string;

  @IsString()
  @IsOptional()
  @Length(5, 20)
  telefono?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @Length(5, 255)
  direccion?: string;
}
