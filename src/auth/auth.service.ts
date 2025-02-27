import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs'; // Ensure bcryptjs is used
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginDto): Promise<string | null> {
    console.log(`🔍 Checking user with email: ${loginDto.email}`);

    const user = await this.usuarioService.findByEmail(loginDto.email);
    if (!user) {
      console.log(`❌ User not found`);
      return null;
    }

    console.log(`✅ User found: ${user.email}, checking password...`);
    console.log(`🔑 Retrieved Password Hash: "${user.password_hash}"`);
    console.log(`🔑 dto Password Hash: "${loginDto.password}"`);
    const isPasswordValid = bcrypt.compareSync(loginDto.password, user.password_hash);
    if (!isPasswordValid) {
      console.log(`❌ Password does not match`);
      return null;
    }

    console.log(`✅ Password is valid, generating token...`);
    return this.jwtService.sign({ id: user.id_usuario, email: user.email });
  }
}
