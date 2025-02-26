import { Controller, Post, Body } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { Empresa } from './empresa.entity';

@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  async create(@Body() createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    return this.empresaService.createEmpresa(createEmpresaDto);
  }
}
