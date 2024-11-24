import { randomUUID, UUID } from "crypto";
import { AuditFields } from "./auditFields";

class ShopViewDto {
    public id: UUID = randomUUID();
    public name: string = '';
    public description: string = '';
    public address: string = '';
}

class ShopCreateDto {
    public name: string = '';
    public description: string = '';
    public address: string = '';
}

class ShopUpdateDto {
    public name: string = '';
    public description: string = '';
    public address: string = '';
}

export {ShopCreateDto, ShopViewDto, ShopUpdateDto}