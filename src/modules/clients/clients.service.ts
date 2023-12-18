import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'lib/prisma';
import { Client } from './entities/client.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const foundClient = await this.prisma.client.findFirst({
      where: { email: createClientDto.email },
    });
    if (foundClient) {
      throw new BadRequestException('Client with this email already exists.');
    }
    const clientToCreate = new Client();
    Object.assign(clientToCreate, {
      ...createClientDto,
    });
    await this.prisma.client.create({
      data: { ...clientToCreate },
    });

    return plainToInstance(Client, clientToCreate);
  }

  async findAll() {
    const foundClients = await this.prisma.client.findMany();
    return plainToInstance(Client, foundClients);
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return plainToInstance(Client, client);
  }

  async findByEmail(email: string) {
    const findClient = await this.prisma.client.findFirst({
      where: { email },
    });

    return findClient;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: { ...updateClientDto },
    });

    return plainToInstance(Client, updatedClient);
  }

  async remove(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException('client not found');
    }
    await this.prisma.client.delete({ where: { id: id } });

    return { message: 'User deleted with success.' };
  }
}
