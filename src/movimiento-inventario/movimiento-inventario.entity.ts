import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn } from 'typeorm';
import { Inventario } from '../inventario/inventario.entity';
import { Producto } from '../producto/producto.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class MovimientoInventario {
  @PrimaryGeneratedColumn()
  id_movimiento: number;

  @ManyToOne(() => Inventario, inventario => inventario.id_inventario, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'id_inventario' })
  inventario: Inventario;

  @ManyToOne(() => Producto, producto => producto.id_producto, { onDelete: 'NO ACTION', nullable: false }) 
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
  
  @ManyToOne(() => Usuario, usuario => usuario.id_usuario, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ type: 'varchar', length: 20 })
  tipo_movimiento: string; // 'entrada', 'salida', 'ajuste'

  @Column({ nullable: false }) // Ensure it matches SQL NOT NULL
  cantidad: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_movimiento: Date;

  @Column({ length: 255, nullable: true }) // Matches SQL VARCHAR(255)
  motivo: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  costo_unitario: number;

  @Column({ length: 100, nullable: true }) // Matches SQL VARCHAR(100)
  ubicacion: string;
}
