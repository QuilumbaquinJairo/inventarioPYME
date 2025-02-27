import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAllCategorias(): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      order: { nombre: 'ASC' }, // ✅ Sort categories alphabetically
    });
  }
}
