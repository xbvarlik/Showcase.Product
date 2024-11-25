import { PrismaClient } from '@prisma/client'
import { UUID } from "crypto";
import { ProductUpperCategoryCreateDto, ProductUpperCategoryUpdateDto, ProductUpperCategoryViewDto } from '../data/models/productUpperCategory';

export class ProductUpperCategoryService {
    private prisma: PrismaClient = new PrismaClient({});

    public async GetProductUpperCategorys(): Promise<ProductUpperCategoryViewDto[]> {
        const query = await this.prisma.productUpperCategory.findMany({
            where: {
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
            }
        });


        if (query.length == 0){
            return [];
        }

        return query.map(x => ({
            id: x.id,
            name: x.name,
        }) as ProductUpperCategoryViewDto)
    }

    public async GetProductUpperCategory(id: number): Promise<ProductUpperCategoryViewDto | undefined> {
        const query = await this.prisma.productUpperCategory.findMany({
            where: {
                id: id,
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
            }
        });

        if (query.length == 0){
            return undefined;
        }

        return query.shift() as ProductUpperCategoryViewDto;
    }

    public async CreateProductUpperCategory(dto: ProductUpperCategoryCreateDto): Promise<ProductUpperCategoryViewDto> {
        const command = await this.prisma.productUpperCategory.create({
            data: {
                name: dto.name,
            }
        });

        return {
            id: command.id,
            name: command.name,
        } as ProductUpperCategoryViewDto;
    }

    public async UpdateProductUpperCategory(id: number, dto: ProductUpperCategoryUpdateDto): Promise<ProductUpperCategoryViewDto> {
        const command = await this.prisma.productUpperCategory.update({
            where: {
                id: id
            },
            data: {
                name: dto.name,
            }
        });

        return {
            id: command.id,
            name: command.name,
        } as ProductUpperCategoryViewDto;
    }

    public async DeleteProductUpperCategory(id: number): Promise<boolean> {
        const command = await this.prisma.productUpperCategory.delete({
            where: {
                id: id,
                isDeleted: false
            }
        });

        return true;
    }
}