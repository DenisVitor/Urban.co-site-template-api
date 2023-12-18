import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'lib/prisma';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    const itemToCreate = new Item();
    Object.assign(itemToCreate, {
      ...createItemDto,
    });
    await this.prisma.item.create({
      data: { ...itemToCreate },
    });

    return itemToCreate;
  }

  async findAll() {
    const allItems = await this.prisma.item.findMany();
    return allItems;
  }

  async findOne(id: string) {
    const foundItem = await this.prisma.item.findUnique({
      where: { id: id },
      include: {
        commentaries: {
          include: {
            client: true,
          },
        },
      },
    });

    if (!foundItem) {
      throw new NotFoundException('Item not found');
    }

    return foundItem;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const foundItem = await this.prisma.item.findFirst({
      where: { id: id },
    });
    if (!foundItem) {
      throw new NotFoundException('Item not found');
    }

    const itemToUpdate = await this.prisma.item.update({
      where: {
        id: id,
      },
      data: {
        ...updateItemDto,
      },
    });
    return itemToUpdate;
  }

  async remove(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    await this.prisma.client.delete({ where: { id: id } });
  }
}
