import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check } from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';

@Entity()
@Check(`estado IN ('pendiente', 'entregado', 'cancelado')`) // Matches SQL CHECK constraint
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa, { onDelete: 'CASCADE', nullable: false }) // Ensures id_empresa is NOT NULL
  empresa: Empresa;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_solicitud: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_entrega: Date;

  @Column({ type: 'varchar', length: 20 })
  estado: string; // 'pendiente', 'entregado', 'cancelado'
}
