import { Entity, BeforeInsert,BeforeUpdate ,PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn,OneToMany } from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';
import { Empresa } from '../empresa/empresa.entity';
import { Proveedor } from '../proveedor/proveedor.entity';
import { MovimientoInventario } from '../movimiento-inventario/movimiento-inventario.entity';


@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({ unique: true, length: 50 }) // Matches VARCHAR(50) in SQL
  codigo_barras: string;

  @Column({ length: 100 }) // Matches VARCHAR(100) in SQL
  nombre: string;

  @Column({ type: 'text' }) // Matches SQL TEXT column
  descripcion: string;

  @ManyToOne(() => Categoria, categoria => categoria.id_categoria, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_categoria' }) // ✅ Explicit column name
  categoria: Categoria;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) // Matches DECIMAL(10,2) NOT NULL
  precio_compra: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) // Matches DECIMAL(10,2) NOT NULL
  precio_venta: number;

  @Column({ default: 0 }) // Matches DEFAULT 0 in SQL
  stock_minimo: number;

  @Column({ default: 0 }) // Matches DEFAULT 0 in SQL
  stock_maximo: number;
  
  @Column({ default: 0 }) // ✅ NEW COLUMN for tracking actual stock
  stock_actual: number;

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa, { onDelete: 'CASCADE', nullable: false }) // Ensures id_empresa is NOT NULL
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;


  @ManyToOne(() => Proveedor, proveedor => proveedor.id_proveedor, { onDelete: 'SET NULL', nullable: true }) // Ensures id_proveedor is optional
  @JoinColumn({ name: 'id_proveedor' }) 
  proveedor: Proveedor;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  ultima_actualizacion: Date;
  @BeforeInsert()
  @BeforeUpdate()
  updateTimestamp() {
    this.ultima_actualizacion = new Date();
  }
  @OneToMany(() => MovimientoInventario, (movimiento) => movimiento.producto)
  movimientos: MovimientoInventario[];
}
