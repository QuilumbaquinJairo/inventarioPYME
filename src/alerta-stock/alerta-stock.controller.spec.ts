import { Test, TestingModule } from '@nestjs/testing';
import { AlertaStockController } from './alerta-stock.controller';

describe('AlertaStockController', () => {
  let controller: AlertaStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertaStockController],
    }).compile();

    controller = module.get<AlertaStockController>(AlertaStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
