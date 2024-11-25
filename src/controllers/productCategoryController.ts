import { ProductCategoryCreateDto, ProductCategoryUpdateDto, ProductCategoryViewDto } from "../data/models/productCategory";
import { ProductCategoryService } from "../services/productCategoryService";
import { UUID } from "crypto";
import { Router, Request, Response } from "express";

export default class ProductCategoryController {
    private service: ProductCategoryService = new ProductCategoryService();
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.GetProductCategorys);
        this.router.get('/:id', this.GetProductCategory);
        this.router.post('/', this.CreateProductCategory);
        this.router.put('/:id', this.UpdateProductCategory);
        this.router.delete('/:id', this.DeleteProductCategory);
    }

    public async GetProductCategorys(req: Request, res: Response): Promise<void> {
        try {
            var result = await this.service.GetProductCategorys();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching productCategorys.' });
        }
    }

    public async GetProductCategory(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as unknown as number
            var result =  await this.service.GetProductCategory(id);

            if (result == undefined)
                throw new Error("Service result is undefined");

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching productCategorys.' });
        }
    }

    public async CreateProductCategory(req: Request, res: Response): Promise<void> {
        try {
            var dto = req.body as ProductCategoryCreateDto;
            var result = await this.service.CreateProductCategory(dto);
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while creating productCategory.' });
        }
    }

    public async UpdateProductCategory(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as unknown as number;
            var dto = req.body as ProductCategoryUpdateDto;
            var result = await this.service.UpdateProductCategory(id, dto);
            res.status(204).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while updating productCategory.' });
        }
    }

    public async DeleteProductCategory(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as unknown as number;
            var result = await this.service.DeleteProductCategory(id);

            if(result == false)
                throw new Error("Something went wrong when deleting productCategory.");
                

            res.status(200).json(`ProductCategory with id ${id} is deleted succesfully`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while deleting productCategory.' });
        }
    }
}