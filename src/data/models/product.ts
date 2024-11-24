import { randomUUID, UUID } from "crypto";
import { AuditFields } from "./auditFields";

export class Product implements AuditFields {
    public id: UUID = randomUUID();
    public name: string = '';
    public description: string = '';
    public price: number = 0;
    public productCategoryId: number = 0;
    public shopId: UUID = randomUUID();

    public createdAt: Date = new Date();
    public createdBy?: `${string}-${string}-${string}-${string}-${string}` | undefined;
    public chagedAt: Date = new Date();
    public changedBy?: `${string}-${string}-${string}-${string}-${string}` | undefined;
    public isDeleted: boolean = false;
}