import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './proveedor.entity';
import { ProveedorController } from './proveedor.controller';
import { ProveedorService } from './proveedor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor])], // ✅ Register Proveedor entity
  controllers: [ProveedorController],
  providers: [ProveedorService],
  exports: [ProveedorService],
})
export class ProveedorModule {}
