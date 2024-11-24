import { UUID } from "crypto";

export interface AuditFields {
    createdAt: Date,
    createdBy?: UUID,
    chagedAt: Date,
    changedBy?: UUID,
    isDeleted: boolean
}