import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRolController } from './usuario-rol.controller';

describe('UsuarioRolController', () => {
  let controller: UsuarioRolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioRolController],
    }).compile();

    controller = module.get<UsuarioRolController>(UsuarioRolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
