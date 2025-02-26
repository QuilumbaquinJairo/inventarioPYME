import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ length: 50 }) // Matches VARCHAR(50) in SQL
  nombre: string;

  @Column({ type: 'text', nullable: true }) // Matches SQL TEXT column
  descripcion: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
}
