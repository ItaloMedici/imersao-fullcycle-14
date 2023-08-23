import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class RoutesDriverService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(dto: { route_id: string; lat: number; lng: number }) {
    const { route_id, lat, lng } = dto;

    return this.prismaService.routerDriver.upsert({
      include: { route: true },
      where: { route_id },
      update: {
        route_id,
        points: {
          push: {
            location: { lat, lng },
          },
        },
      },
      create: {
        route_id,
        points: {
          set: {
            location: { lat, lng },
          },
        },
      },
    });
  }
}
