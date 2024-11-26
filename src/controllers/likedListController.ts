import { Request, Response  } from "express";
import { LikedListService } from "../services/likedListService";
import { Controller, ServiceController } from "../utilities/interfaces/controller";
import { Service } from "../utilities/interfaces/service";
import { LikedListCreateDto } from "../data/models/likedList";
import { UUID } from "crypto";

export class LikedListController extends Controller implements ServiceController {
    public service: LikedListService = new LikedListService();

    constructor() {
        super();
    }

    protected initializeRoutes(): void {
        this.router.get('/by-user/:userId', this.GetUsersLikedLists);
        this.router.get('/by-id/:id', this.GetLikedListById);
        this.router.get('/', this.SearchLikedList);
        this.router.post('/', this.CreateLikedList);
        this.router.delete('/:id', this.DeleteLikedList);
        this.router.post('/items', this.AddItemToLikedList);
        this.router.delete('/items', this.RemoveItemFromLikedList);
    }

    public async CreateLikedList(req: Request, res: Response): Promise<void> {
        try {
            var dto = req.body as LikedListCreateDto;
            var result = await this.service.CreateLikedList(dto);

            if (result == undefined)
                throw new Error("Service result is undefined");

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while creating list.' });
        }
    }

    public async DeleteLikedList(req: Request, res: Response): Promise<void> {
        try {
            var result = await this.service.DeleteLikedList(req.params.id as UUID);

            if (result == undefined || false)
                throw new Error("Service result is undefined");

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while creating list.' });
        }
    }

    public async GetUsersLikedLists(req: Request, res: Response): Promise<void> {
        try {
            var result = await this.service.GetLikedLists({
                userId: req.params.userId as UUID
            });

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while getting lists.' });
        }
    }

    public async GetLikedListById(req: Request, res: Response): Promise<void> {
        try {
            var result = await this.service.GetLikedLists({
                id: req.params.id as UUID
            });

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while getting lists.' });
        }
    }

    public async SearchLikedList(req: Request, res: Response): Promise<void> {
        try {
            var result = await this.service.GetLikedLists({
                title: req.params.title 
            });

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while getting lists.' });
        }
    }

    public async AddItemToLikedList(req: Request, res: Response): Promise<void> {
        try {
            var {productId, listId} = req.body

            var result = await this.service.AddItem(productId as UUID, listId as UUID);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while adding item to the list.' });
        }
    }

    public async RemoveItemFromLikedList(req: Request, res: Response): Promise<void> {
        try {
            var {productId, listId} = req.body

            var result = await this.service.RemoveItem(productId as UUID, listId as UUID);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while adding item to the list.' });
        }
    }
}