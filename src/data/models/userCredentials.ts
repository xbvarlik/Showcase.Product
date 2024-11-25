import { UUID } from "crypto";

export default class UserCredentials {
    public id!: UUID;
    public roles: string[] = [];
}