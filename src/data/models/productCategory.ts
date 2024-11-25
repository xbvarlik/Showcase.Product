class ProductCategoryViewDto {
    public id: number = 0;
    public name: string = '';
    public productUpperCategoryId: number = 0;
}

class ProductCategoryCreateDto {
    public name: string = '';
    public productUpperCategoryId: number = 0;
}

class ProductCategoryUpdateDto {
    public name: string = '';
    public productUpperCategoryId: number = 0;
}

export {ProductCategoryCreateDto, ProductCategoryUpdateDto, ProductCategoryViewDto}