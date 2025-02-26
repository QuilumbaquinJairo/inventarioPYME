import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  id_proveedor: number;

  @Column({ length: 100 }) // Matches VARCHAR(100) in SQL
  nombre: string;

  @Column({ length: 100 }) // Matches VARCHAR(100) in SQL
  contacto: string;

  @Column({ length: 20 }) // Matches VARCHAR(20) in SQL
  telefono: string;

  @Column({ unique: true, length: 100 }) // Matches VARCHAR(100) in SQL
  email: string;

  @Column({ length: 255 }) // Matches VARCHAR(255) in SQL
  direccion: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
}
