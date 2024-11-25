import { PrismaClient } from '@prisma/client'
import { UUID } from "crypto";
import { ProductCategoryCreateDto, ProductCategoryUpdateDto, ProductCategoryViewDto } from '../data/models/productCategory';

export class ProductCategoryService {
    private prisma: PrismaClient = new PrismaClient({});

    public async GetProductCategorys(): Promise<ProductCategoryViewDto[]> {
        const query = await this.prisma.productCategory.findMany({
            where: {
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
                productUpperCategoryId: true,
            }
        });


        if (query.length == 0){
            return [];
        }

        return query.map(x => ({
            id: x.id,
            name: x.name,
            productUpperCategoryId: x.productUpperCategoryId,
        }) as ProductCategoryViewDto)
    }

    public async GetProductCategory(id: number): Promise<ProductCategoryViewDto | undefined> {
        const query = await this.prisma.productCategory.findMany({
            where: {
                id: id,
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
                productUpperCategoryId: true,
            }
        });

        if (query.length == 0){
            return undefined;
        }

        return query.shift() as ProductCategoryViewDto;
    }

    public async CreateProductCategory(dto: ProductCategoryCreateDto): Promise<ProductCategoryViewDto> {
        const command = await this.prisma.productCategory.create({
            data: {
                name: dto.name,
                productUpperCategoryId: dto.productUpperCategoryId,
            }
        });

        return {
            id: command.id,
            name: command.name,
            productUpperCategoryId: command.productUpperCategoryId,
        } as ProductCategoryViewDto;
    }

    public async UpdateProductCategory(id: number, dto: ProductCategoryUpdateDto): Promise<ProductCategoryViewDto> {
        const command = await this.prisma.productCategory.update({
            where: {
                id: id
            },
            data: {
                name: dto.name,
                productUpperCategoryId: dto.productUpperCategoryId,
            }
        });

        return {
            id: command.id,
            name: command.name,
            productUpperCategoryId: command.productUpperCategoryId,
        } as ProductCategoryViewDto;
    }

    public async DeleteProductCategory(id: number): Promise<boolean> {
        const command = await this.prisma.productCategory.delete({
            where: {
                id: id,
                isDeleted: false
            }
        });

        return true;
    }
}