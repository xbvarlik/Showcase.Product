import { ProductUpperCategoryCreateDto, ProductUpperCategoryUpdateDto, ProductUpperCategoryViewDto } from "../data/models/productUpperCategory";
import { ProductUpperCategoryService } from "../services/productUpperCategoryService";
import { UUID } from "crypto";
import { Router, Request, Response } from "express";

export default class ProductUpperCategoryController {
    private service: ProductUpperCategoryService = new ProductUpperCategoryService();
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.GetProductUpperCategorys);
        this.router.get('/:id', this.GetProductUpperCategory);
        this.router.post('/', this.CreateProductUpperCategory);
        this.router.put('/:id', this.UpdateProductUpperCategory);
        this.router.delete('/:id', this.DeleteProductUpperCategory);
    }

    public async GetProductUpperCategorys(req: Request, res: Response): Promise<void> {
        try {
            var result = await this.service.GetProductUpperCategorys();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching productUpperCategorys.' });
        }
    }

    public async GetProductUpperCategory(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as unknown as number
            var result =  await this.service.GetProductUpperCategory(id);

            if (result == undefined)
                throw new Error("Service result is undefined");

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching productUpperCategorys.' });
        }
    }

    public async CreateProductUpperCategory(req: Request, res: Response): Promise<void> {
        try {
            var dto = req.body as ProductUpperCategoryCreateDto;
            var result = await this.service.CreateProductUpperCategory(dto);
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while creating productUpperCategory.' });
        }
    }

    public async UpdateProductUpperCategory(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as unknown as number;
            var dto = req.body as ProductUpperCategoryUpdateDto;
            var result = await this.service.UpdateProductUpperCategory(id, dto);
            res.status(204).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while updating productUpperCategory.' });
        }
    }

    public async DeleteProductUpperCategory(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as unknown as number;
            var result = await this.service.DeleteProductUpperCategory(id);

            if(result == false)
                throw new Error("Something went wrong when deleting productUpperCategory.");
                

            res.status(200).json(`ProductUpperCategory with id ${id} is deleted succesfully`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while deleting productUpperCategory.' });
        }
    }
}