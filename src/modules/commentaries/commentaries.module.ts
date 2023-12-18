import { Module } from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CommentariesController } from './commentaries.controller';
import { PrismaService } from 'lib/prisma';

@Module({
  controllers: [CommentariesController],
  providers: [CommentariesService, PrismaService],
})
export class CommentariesModule {}
