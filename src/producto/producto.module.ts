import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Categoria } from '../categoria/categoria.entity';
import { Empresa } from '../empresa/empresa.entity';
import { Proveedor } from '../proveedor/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Categoria, Empresa, Proveedor])],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}
