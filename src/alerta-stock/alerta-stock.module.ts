import { Module } from '@nestjs/common';
import { AlertaStockController } from './alerta-stock.controller';
import { AlertaStockService } from './alerta-stock.service';

@Module({
  controllers: [AlertaStockController],
  providers: [AlertaStockService]
})
export class AlertaStockModule {}
