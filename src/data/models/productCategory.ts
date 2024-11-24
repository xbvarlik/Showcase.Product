import { randomUUID, UUID } from "crypto";
import { AuditFields } from "./auditFields";

export class ProductCategory implements AuditFields {
    public id: number = 0;
    public name: string = '';
    public productUpperCategoryId: number = 0;

    public createdAt: Date = new Date();
    public createdBy?: `${string}-${string}-${string}-${string}-${string}` | undefined;
    public chagedAt: Date = new Date();
    public changedBy?: `${string}-${string}-${string}-${string}-${string}` | undefined;
    public isDeleted: boolean = false;
}