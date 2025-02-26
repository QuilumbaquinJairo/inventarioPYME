import { Controller, Post, Body, Get,Delete,Put,Query,Param} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { Producto } from './producto.entity';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.productoService.createProducto(createProductoDto);
  }

  @Get()
  async getProductos(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('categoriaId') categoriaId?: number,
    @Query('empresaId') empresaId?: number,
    @Query('minPrecio') minPrecio?: number,
    @Query('maxPrecio') maxPrecio?: number
  ) {
    return this.productoService.getProductos(limit, offset, categoriaId, empresaId, minPrecio, maxPrecio);
  }

  @Get(':id')
  async getProductoById(@Param('id') id: number): Promise<Producto> {
    return this.productoService.getProductoById(id);
  }
  @Put(':id')
  async updateProducto(@Param('id') id: number, @Body() dto: UpdateProductoDto): Promise<Producto> {
    return this.productoService.updateProducto(id, dto);
  }

  @Delete(':id')
  async deleteProducto(@Param('id') id: number): Promise<{ message: string }> {
    await this.productoService.deleteProducto(id);
    return { message: `✅ Product with ID ${id} deleted successfully.` };
  }
}
