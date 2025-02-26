import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable,JoinColumn, BeforeInsert } from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';
import { Rol } from '../rol/rol.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre_completo: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono: string;

  @Column({ default: true })
  estado: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'datetime', nullable: true })
  ultima_conexion: Date;

  @Column()
  password_hash: string;

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @ManyToMany(() => Rol, rol => rol.usuarios)
  @JoinTable({
    name: 'Usuario_Rol',
    joinColumn: { name: 'id_usuario', referencedColumnName: 'id_usuario' },
    inverseJoinColumn: { name: 'id_rol', referencedColumnName: 'id_rol' }
  })
  roles: Rol[];
  @BeforeInsert()
  async hashPassword() {
    this.password_hash = await bcrypt.hash(this.password_hash, 10);
  }
}
