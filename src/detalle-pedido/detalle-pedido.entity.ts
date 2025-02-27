import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';
import { Producto } from '../producto/producto.entity';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id_detalle_pedido: number;

  @ManyToOne(() => Pedido, pedido => pedido.id_pedido, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'id_pedido' }) // ✅ Explicitly define the correct foreign key column name
  pedido: Pedido;

  @ManyToOne(() => Producto, producto => producto.id_producto, { onDelete: 'NO ACTION', nullable: false })
  @JoinColumn({ name: 'id_producto' }) // ✅ Explicitly define the correct foreign key column name
  producto: Producto;

  @Column({ type: 'int', nullable: false })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  precio_unitario: number;
}
