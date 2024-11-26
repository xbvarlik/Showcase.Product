import { PrismaClient } from '@prisma/client'
import { UUID } from "crypto";
import { ProductViewDto } from '../data/models/product';
import { Service } from '../utilities/interfaces/service';
import { LikedListCreateDto, LikedListQueryFilter, LikedListViewDto } from '../data/models/likedList';
import { log } from 'console';


export class LikedListService implements Service {
    private prisma: PrismaClient = new PrismaClient({});

    public async CreateLikedList(dto: LikedListCreateDto) : Promise<LikedListViewDto> {
        var command = await this.prisma.likedList.create({
            data: {
                userId: dto.userId,
                title: dto.title,
                isPublic: dto.isPublic
            }
        });

        return {
            id: command.id,
            userId: command.userId,
            title: command.title,
            isPublic: command.isPublic
        } as LikedListViewDto;
    }

    public GetLikedList = async (filter: LikedListQueryFilter): Promise<LikedListViewDto> => 
        await this.GetLikedLists(filter)
        .then(x => x.shift())
        .then(x => {
            if (x === undefined)
                throw new Error("Result is undefined.");

            return x;
        });

    public async GetLikedLists(filters: LikedListQueryFilter): Promise<LikedListViewDto[]> {
        
        const {id, userId, title, isPublic} = filters;

        var query = await this.prisma.likedList.findMany({
            where: {
                ...(userId !== undefined && { userId }),
                ...(id !== undefined && { id }),
                ...(isPublic !== undefined && { isPublic }),
                ...(title !== undefined && { title: { contains: title, mode: "insensitive"}}),
                isDeleted: false
            },
            select: {
                id: true,
                userId: true,
                title: true,
                isPublic: true,
                likedListItems: {
                    select: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true
                            }
                        }
                    }
                }
            }
        });

        if (query == null || undefined) 
            throw new Error("List not found.");

        if (query.length === 0)
            return [];

        return query.map(x => ({
            id: x.id,
            userId: x.userId,
            title: x.title,
            isPublic: x.isPublic,
            products: x.likedListItems.map(y => ({
                id: y.product.id,
                name: y.product.name,
                price: y.product.price
            }) as ProductViewDto)
        }) as LikedListViewDto);
    }

    public async AddItem(productId: UUID, listId: UUID): Promise<LikedListViewDto> {
        var command = await this.prisma.likedListItem.create({
            data:{
                likedListId: listId,
                productId: productId
            },
            select: {
                likedList: true
            }
        });

        return await this.GetLikedList({
            id: command.likedList.id as UUID
        });
    }

    public async RemoveItem(productId: UUID, listId: UUID): Promise<LikedListViewDto> {
        var command = await this.prisma.likedListItem.delete({
            where: {
                productId_likedListId:{
                    productId: productId,
                    likedListId: listId
            }},
            select: {
                likedList: true
            }
        });

        return await this.GetLikedList({
            id: command.likedList.id as UUID
        });
    }

    public async DeleteLikedList(id: UUID): Promise<boolean> {
        try {
            var command = await this.prisma.likedList.delete({
                where: {
                    id: id
                }
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

