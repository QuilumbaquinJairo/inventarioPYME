import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  ruc: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  telefono: string;

  @IsEmail()
  email_contacto: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  sector: string;
}
