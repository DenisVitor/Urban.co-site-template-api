import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { ClientsService } from '../clients/clients.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private client: ClientsService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.client.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      token: this.jwtService.sign({ email: email }, { subject: user.id }),
    };
  }
}
