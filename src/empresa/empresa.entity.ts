import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id_empresa: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true, length: 20 })
  ruc: string;

  @Column({ length: 255 })
  direccion: string;

  @Column({ length: 20 })
  telefono: string;

  @Column({ unique: true, length: 100 })
  email_contacto: string;

  @Column({ length: 50 })
  sector: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'bit', default: 1 })
  estado: boolean;
}
