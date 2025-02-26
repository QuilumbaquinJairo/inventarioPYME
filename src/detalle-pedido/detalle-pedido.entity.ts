import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';
import { Producto } from '../producto/producto.entity';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id_detalle_pedido: number;

  @ManyToOne(() => Pedido, pedido => pedido.id_pedido, { onDelete: 'CASCADE' })
  pedido: Pedido;

  @ManyToOne(() => Producto, producto => producto.id_producto, { onDelete: 'NO ACTION' })
  producto: Producto;

  @Column({ nullable: false }) // Ensure it matches SQL NOT NULL
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) // Matches SQL DECIMAL(10,2) NOT NULL
  precio_unitario: number;
}
