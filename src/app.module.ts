import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { CommentariesModule } from './modules/commentaries/commentaries.module';
import { ItemsModule } from './modules/items/items.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ClientsModule, CommentariesModule, ItemsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
