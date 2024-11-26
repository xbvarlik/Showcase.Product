import { UUID } from "crypto";
import { ProductViewDto } from "./product";

class LikedListCreateDto {
    public userId!: UUID;
    public title!: string;
    public isPublic: boolean = false;
}

class LikedListViewDto {
    public id!: UUID;
    public userId!: UUID;
    public title!: string;
    public isPublic: boolean = false;
    public products?: ProductViewDto[];
}

class LikedListQueryFilter {
    public id?: UUID;
    public userId?: UUID;
    public title?: string;
    public isPublic?: boolean;
}

export { LikedListCreateDto, LikedListViewDto, LikedListQueryFilter}