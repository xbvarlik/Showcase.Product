import { ProductCreateDto, ProductUpdateDto, ProductViewDto } from "../data/models/product";
import { ProductService } from "../services/productService";
import { UUID } from "crypto";
import { Router, Request, Response } from "express";
import Authorize from "../utilities/decorators/authorize";
import { UserRoleConstants } from "../data/constants/auth";

export default class ProductController {
    private service: ProductService = new ProductService();
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.GetProducts);
        this.router.get('/:id', this.GetProduct);
        this.router.post('/', this.CreateProduct);
        this.router.put('/:id', this.UpdateProduct);
        this.router.delete('/:id', this.DeleteProduct);
    }

    public async GetProducts(req: Request, res: Response): Promise<void> {
        try {
            var result = await this.service.GetProducts();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching products.' });
        }
    }

    public async GetProduct(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as UUID
            var result =  await this.service.GetProduct(id);

            if (result == undefined)
                throw new Error("Service result is undefined");

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching products.' });
        }
    }

    @Authorize(UserRoleConstants.SHOP_OWNER)
    public async CreateProduct(req: Request, res: Response): Promise<void> {
        try {
            var dto = req.body as ProductCreateDto;
            var result = await this.service.CreateProduct(dto);
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while creating product.' });
        }
    }

    @Authorize(UserRoleConstants.SHOP_OWNER)
    public async UpdateProduct(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as UUID;
            var dto = req.body as ProductUpdateDto;
            var result = await this.service.UpdateProduct(id, dto);
            res.status(204).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while updating product.' });
        }
    }

    @Authorize(UserRoleConstants.SHOP_OWNER)
    public async DeleteProduct(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as UUID;
            var result = await this.service.DeleteProduct(id);

            if(result == false)
                throw new Error("Something went wrong when deleting product.");
                

            res.status(200).json(`Product with id ${id} is deleted succesfully`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while deleting product.' });
        }
    }
}