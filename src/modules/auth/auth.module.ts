import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientsModule } from '../clients/clients.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { Passport } from 'passport';

@Module({
  imports: [
    ClientsModule,
    Passport,
    JwtModule.register({
      secret: process.env.SUPABASE_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
