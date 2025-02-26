import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Producto } from '../producto/producto.entity';

@Entity()
export class AlertaStock {
  @PrimaryGeneratedColumn()
  id_alerta: number;

  @ManyToOne(() => Producto, producto => producto.id_producto, { onDelete: 'CASCADE' })
  producto: Producto;

  @Column({ nullable: false }) // Ensure it matches SQL NOT NULL
  nivel_minimo: number;

  @Column({ type: 'bit', default: 1 }) // Matches SQL BIT type
  estado: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
}
