import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { PrismaService } from 'lib/prisma';
import { Commentary } from './entities/commentary.entity';

@Injectable()
export class CommentariesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCommentaryDto: CreateCommentaryDto,
    itemId: string,
    clientId: string,
  ) {
    const foundCommentary = await this.prisma.commentary.findMany({
      where: { clientId: clientId, itemId: itemId },
    });

    if (foundCommentary) {
      throw new ConflictException('This user already commented on this item.');
    }
    const commentaryToCreate = new Commentary();
    Object.assign(commentaryToCreate, { ...createCommentaryDto });
    await this.prisma.commentary.create({
      data: { ...commentaryToCreate, clientId: clientId, itemId: itemId },
    });
    return commentaryToCreate;
  }

  async findOne(clientId: string, itemId: string) {
    const foundCommentary = await this.prisma.commentary.findFirst({
      where: { clientId: clientId, itemId: itemId },
    });

    if (!foundCommentary) {
      throw new NotFoundException('Commentary not found');
    }

    return foundCommentary;
  }

  async update(
    clientId: string,
    itemId: string,
    updateCommentaryDto: UpdateCommentaryDto,
  ) {
    const foundCommentary = await this.prisma.commentary.findFirst({
      where: { clientId: clientId, itemId: itemId },
    });

    if (!foundCommentary) {
      throw new NotFoundException('Commentary not found');
    }

    const commentaryToUpdate = await this.prisma.commentary.update({
      where: { id: foundCommentary.id },
      data: { ...updateCommentaryDto },
    });

    return commentaryToUpdate;
  }

  async remove(clientId: string, itemId: string) {
    const foundCommentary = await this.prisma.commentary.findFirst({
      where: { clientId: clientId, itemId: itemId },
    });

    if (!foundCommentary) {
      throw new NotFoundException('Commentary not found');
    }

    return await this.prisma.commentary.delete({
      where: { id: foundCommentary.id },
    });
  }
}
