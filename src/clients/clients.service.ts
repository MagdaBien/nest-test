import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public getAll(): Promise<Client[]> {
    return this.prismaService.client.findMany();
  }

  public getById(id: Client['id']): Promise<Client | null> {
    return this.prismaService.client.findUnique({
      where: { id },
    });
  }

  public deleteById(id: Client['id']): Promise<Client> {
    return this.prismaService.client.delete({
      where: { id },
    });
  }

  public create(
    clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Client> {
    return this.prismaService.client.create({
      data: clientData,
    });
  }

  public updateById(
    id: Client['id'],
    clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Client> {
    return this.prismaService.client.update({
      where: { id },
      data: clientData,
    });
  }
}
