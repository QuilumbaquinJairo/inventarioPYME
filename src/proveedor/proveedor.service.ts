import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './proveedor.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async findAllProveedores(): Promise<Proveedor[]> {
    return this.proveedorRepository.find({
      order: { nombre: 'ASC' }, // ✅ Sort suppliers alphabetically
    });
  }

  async getProveedorById(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({ where: { id_proveedor: id } });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado.`);
    }

    return proveedor;
  }

  async createProveedor(dto: CreateProveedorDto): Promise<Proveedor> {
    // ✅ Check if email already exists
    const existingProveedor = await this.proveedorRepository.findOne({
      where: { email: dto.email },
    });

    if (existingProveedor) {
      throw new BadRequestException(`❌ The email "${dto.email}" is already registered.`);
    }

    // ✅ Create new supplier
    const newProveedor = this.proveedorRepository.create(dto);
    return this.proveedorRepository.save(newProveedor);
  }
  async updateProveedor(id: number, dto: UpdateProveedorDto): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({ where: { id_proveedor: id } });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor with ID ${id} not found.`);
    }

    // ✅ Check if the email is being updated and already exists
    if (dto.email && dto.email !== proveedor.email) {
      const existingProveedor = await this.proveedorRepository.findOne({ where: { email: dto.email } });
      if (existingProveedor) {
        throw new BadRequestException(`The email "${dto.email}" is already registered.`);
      }
    }

    // ✅ Update supplier details
    await this.proveedorRepository.update(id, dto);

    // ✅ Return updated supplier
    const updatedProveedor = await this.proveedorRepository.findOne({ where: { id_proveedor: id } });
    if (!updatedProveedor) {
      throw new NotFoundException(`Proveedor with ID ${id} not found after update.`);
    }
    return updatedProveedor;
  }
  async deleteProveedor(id: number): Promise<void> {
    const proveedor = await this.proveedorRepository.findOne({ where: { id_proveedor: id } });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor with ID ${id} not found.`);
    }

    try {
      await this.proveedorRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(`Cannot delete proveedor with ID ${id}, it may be linked to other records.`);
    }
  }
}
