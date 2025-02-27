import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  contacto: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  direccion: string;
}
