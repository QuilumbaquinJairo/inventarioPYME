import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check } from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
@Check(`tipo IN ('inventario', 'ventas', 'pérdidas')`) // Matches SQL CHECK constraint
export class Reporte {
  @PrimaryGeneratedColumn()
  id_reporte: number;

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa, { onDelete: 'CASCADE', nullable: false }) // Ensures id_empresa is NOT NULL
  empresa: Empresa;

  @Column({ type: 'varchar', length: 50 })
  tipo: string; // 'inventario', 'ventas', 'pérdidas'

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_generacion: Date;

  @Column({ length: 255 }) // Matches VARCHAR(255) in SQL
  archivo_pdf: string;

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario, { onDelete: 'SET NULL' })
  usuario: Usuario;
}
