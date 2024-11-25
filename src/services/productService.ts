import { PrismaClient } from '@prisma/client'
import { UUID } from "crypto";
import { ProductCreateDto, ProductUpdateDto, ProductViewDto } from '../data/models/product';

export class ProductService {
    private prisma: PrismaClient = new PrismaClient({});

    public async GetProducts(): Promise<ProductViewDto[]> {
        const query = await this.prisma.product.findMany({
            where: {
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                productCategoryId: true,
                shopId: true
            }
        });


        if (query.length == 0){
            return [];
        }

        return query.map(x => ({
            id: x.id,
            name: x.name,
            description: x.description,
            price: x.price,
            productCategoryId: x.productCategoryId,
            shopId: x.shopId
        }) as ProductViewDto)
    }

    public async GetProduct(id: UUID): Promise<ProductViewDto | undefined> {
        const query = await this.prisma.product.findMany({
            where: {
                id: id,
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
                description: true,
            }
        });

        if (query.length == 0){
            return undefined;
        }

        return query.shift() as ProductViewDto;
    }

    public async CreateProduct(dto: ProductCreateDto): Promise<ProductViewDto> {
        const command = await this.prisma.product.create({
            data: {
                name: dto.name,
                price: dto.price,
                description: dto.description,
                productCategoryId: dto.productCategoryId,
                shopId: dto.shopId
            }
        });

        return {
            id: command.id,
            name: command.name,
            description: command.description,
            price: command.price,
            productCategoryId: command.productCategoryId,
            shopId: command.shopId
        } as ProductViewDto;
    }

    public async UpdateProduct(id: UUID, dto: ProductUpdateDto): Promise<ProductViewDto> {
        const command = await this.prisma.product.update({
            where: {
                id: id
            },
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                productCategoryId: dto.productCategoryId,
                shopId: dto.shopId
            }
        });

        return {
            id: command.id,
            name: command.name,
            description: command.description,
            price: command.price,
            productCategoryId: command.productCategoryId,
            shopId: command.shopId
        } as ProductViewDto;
    }

    public async DeleteProduct(id: UUID): Promise<boolean> {
        const command = await this.prisma.product.delete({
            where: {
                id: id,
                isDeleted: false
            }
        });

        return true;
    }
}