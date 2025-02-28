import { Entity, ManyToOne, PrimaryColumn, Column, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Rol } from '../rol/rol.entity';

@Entity({ name: 'Usuario_Rol' })
export class UsuarioRol {
  @PrimaryColumn() 
  id_usuario: number;

  @PrimaryColumn() 
  id_rol: number;

  @ManyToOne(() => Usuario, usuario => usuario.roles, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Rol, rol => rol.usuarios, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_asignacion: Date;
}
