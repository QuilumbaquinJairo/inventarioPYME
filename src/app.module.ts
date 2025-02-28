import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmpresaModule } from './empresa/empresa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { InventarioModule } from './inventario/inventario.module';
import { MovimientoInventarioModule } from './movimiento-inventario/movimiento-inventario.module';
import { AuthModule } from './auth/auth.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { ReporteModule } from './reporte/reporte.module';
import { AlertaStockModule } from './alerta-stock/alerta-stock.module';
import { PedidoModule } from './pedido/pedido.module';
import { DetallePedidoModule } from './detalle-pedido/detalle-pedido.module';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioRolModule } from './usuario-rol/usuario-rol.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_HOST_PORT) || 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }), EmpresaModule, UsuarioModule, RolModule, ProductoModule, CategoriaModule, InventarioModule, MovimientoInventarioModule, AuthModule, ProveedorModule, ReporteModule, AlertaStockModule, PedidoModule, DetallePedidoModule, UsuarioRolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}