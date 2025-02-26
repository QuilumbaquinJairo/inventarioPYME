import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module'; // Fix: Import UsuarioModule
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsuarioModule, // Fix: Now AuthModule has access to UsuarioService
    JwtModule.register({
      secret: "grupo5",
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
