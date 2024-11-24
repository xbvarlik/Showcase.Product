import { PrismaClient } from '@prisma/client'
import { UUID } from "crypto";
import { ShopCreateDto, ShopUpdateDto, ShopViewDto } from '../data/models/shop';

export class ShopService {
    private prisma: PrismaClient = new PrismaClient({});

    public async GetShops(): Promise<ShopViewDto[]> {
        const query = await this.prisma.shop.findMany({
            where: {
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
                address: true,
                description: true,
            }
        });


        if (query.length == 0){
            return [];
        }

        return query.map(x => ({
            id: x.id,
            name: x.name,
            description: x.description,
            address: x.address
        }) as ShopViewDto)
    }

    public async GetShop(id: UUID): Promise<ShopViewDto | undefined> {
        const query = await this.prisma.shop.findMany({
            where: {
                id: id,
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
                address: true,
                description: true,
            }
        });

        if (query.length == 0){
            return undefined;
        }

        return query.shift() as ShopViewDto;
    }

    public async CreateShop(dto: ShopCreateDto): Promise<ShopViewDto> {
        const command = await this.prisma.shop.create({
            data: {
                name: dto.name,
                address: dto.address,
                description: dto.description 
            }
        });

        return {
            id: command.id,
            name: command.name,
            description: command.description,
            address: command.address
        } as ShopViewDto;
    }

    public async UpdateShop(id: UUID, dto: ShopUpdateDto): Promise<ShopViewDto> {
        const command = await this.prisma.shop.update({
            where: {
                id: id
            },
            data: {
                name: dto.name,
                description: dto.description,
                address: dto.address
            }
        });

        return {
            id: command.id,
            name: command.name,
            description: command.description,
            address: command.address
        } as ShopViewDto;
    }

    public async DeleteShop(id: UUID): Promise<boolean> {
        const command = await this.prisma.shop.delete({
            where: {
                id: id,
                isDeleted: false
            }
        });

        return true;
    }
}