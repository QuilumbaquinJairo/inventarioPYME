import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check,JoinColumn,OneToMany } from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';

@Entity()
@Check(`estado IN ('pendiente', 'entregado', 'cancelado')`) // Matches SQL CHECK constraint
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa, { onDelete: 'CASCADE', nullable: false }) // Ensures id_empresa is NOT NULL
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_solicitud: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_entrega: Date;

  @Column({ type: 'varchar', length: 20 })
  estado: string; // 'pendiente', 'entregado', 'cancelado'
  
  @OneToMany(() => DetallePedido, detalle => detalle.pedido, { cascade: true })
  detalles: DetallePedido[];
}
