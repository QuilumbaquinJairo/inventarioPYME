import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ length: 50 }) // Matches VARCHAR(50) in SQL
  nombre: string;

  @Column({ type: 'text', nullable: true }) // Matches TEXT in SQL
  descripcion: string;

  @ManyToMany(() => Usuario, usuario => usuario.roles)
  @JoinTable({ name: 'Usuario_Rol' }) // Explicitly define the join table
  usuarios: Usuario[];
}
