import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async createEmpresa(dto: CreateEmpresaDto): Promise<Empresa> {
    // 🔍 Check if RUC already exists
    const existingEmpresa = await this.empresaRepository.findOne({
        where: [{ ruc: dto.ruc }, { email_contacto: dto.email_contacto }],
      });
      if (existingEmpresa) {
        throw new BadRequestException(`❌ The RUC or Email is already registered.`);
      }      

    if (existingEmpresa) {
      throw new BadRequestException(`❌ The RUC "${dto.ruc}" is already registered.`);
    }

    // ✅ Create and save the new Empresa
    const nuevaEmpresa = this.empresaRepository.create(dto);
    return this.empresaRepository.save(nuevaEmpresa);
  }
}
