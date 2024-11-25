import { ShopCreateDto, ShopUpdateDto, ShopViewDto } from "../data/models/shop";
import { ShopService } from "../services/shopService";
import { UUID } from "crypto";
import { Router, Request, Response, NextFunction } from "express";
import Authorize from "../utilities/decorators/authorize";
import { UserRoleConstants } from "../data/constants/auth";

export default class ShopController {
    private service: ShopService = new ShopService();
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.GetShops);
        this.router.get('/:id', this.GetShop);
        this.router.post('/', this.CreateShop);
        this.router.put('/:id', this.UpdateShop);
        this.router.delete('/:id', this.DeleteShop);
    }

    public async GetShops(req: Request, res: Response): Promise<void> {
        try {
            var result = await this.service.GetShops();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching shops.' });
        }
    }

    public async GetShop(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as UUID
            var result =  await this.service.GetShop(id);

            if (result == undefined)
                throw new Error("Service result is undefined");

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching shops.' });
        }
    }

    @Authorize(UserRoleConstants.SHOP_OWNER)
    public async CreateShop(req: Request, res: Response): Promise<void> {
        try {
            var dto = req.body as ShopCreateDto;
            var result = await this.service.CreateShop(dto);
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while creating shop.' });
        }
    }

    @Authorize(UserRoleConstants.SHOP_OWNER)
    public async UpdateShop(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as UUID;
            var dto = req.body as ShopUpdateDto;
            var result = await this.service.UpdateShop(id, dto);
            res.status(204).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while updating shop.' });
        }
    }

    @Authorize(UserRoleConstants.SHOP_OWNER)
    public async DeleteShop(req: Request, res: Response): Promise<void> {
        try {
            var id = req.params.id as UUID;
            var result = await this.service.DeleteShop(id);

            if(result == false)
                throw new Error("Something went wrong when deleting shop.");
                

            res.status(200).json(`Shop with id ${id} is deleted succesfully`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while deleting shop.' });
        }
    }
}