import { Controller, Get } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  async getAllCategorias(): Promise<Categoria[]> {
    return this.categoriaService.findAllCategorias();
  }
}
