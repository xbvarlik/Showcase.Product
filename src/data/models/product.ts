import { Decimal, DecimalJsLike } from "@prisma/client/runtime/library";
import { randomUUID, UUID } from "crypto";

class ProductViewDto {
    public id!: UUID;
    public name: string = '';
    public description: string = '';
    public price: Decimal = new Decimal(0.0);
    public productCategoryId: number = 0;
    public shopId: UUID = randomUUID();
}

class ProductCreateDto {
    public name: string = '';
    public description: string = '';
    public price: Decimal = new Decimal(0.0);
    public productCategoryId: number = 0;
    public shopId: UUID = randomUUID();
}

class ProductUpdateDto {
    public id: UUID = randomUUID();
    public name: string = '';
    public description: string = '';
    public price: Decimal = new Decimal(0.0);
    public productCategoryId: number = 0;
    public shopId: UUID = randomUUID();
}

export {ProductCreateDto, ProductUpdateDto, ProductViewDto}