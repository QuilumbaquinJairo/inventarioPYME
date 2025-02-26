import { Test, TestingModule } from '@nestjs/testing';
import { AlertaStockService } from './alerta-stock.service';

describe('AlertaStockService', () => {
  let service: AlertaStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertaStockService],
    }).compile();

    service = module.get<AlertaStockService>(AlertaStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
