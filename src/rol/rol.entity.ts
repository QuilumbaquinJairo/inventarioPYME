import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,OneToMany } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioRol } from '../usuario-rol/usuario-rol.entity';

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

  @OneToMany(() => UsuarioRol, usuarioRol => usuarioRol.rol)
  usuarioRoles: UsuarioRol[];
}
