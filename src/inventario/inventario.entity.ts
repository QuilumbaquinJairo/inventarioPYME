import { Entity, PrimaryGeneratedColumn, OneToMany,Column, ManyToOne,JoinColumn } from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';
import { Producto } from '../producto/producto.entity';
import { MovimientoInventario } from '../movimiento-inventario/movimiento-inventario.entity';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id_inventario: number;

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa, { onDelete: 'CASCADE', nullable: false }) // Ensures id_empresa is NOT NULL
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion: Date;
   // ✅ FIX: Add relation with Producto to access stock details
   @OneToMany(() => MovimientoInventario, (movimiento) => movimiento.inventario)
   movimientos: MovimientoInventario[];
}
