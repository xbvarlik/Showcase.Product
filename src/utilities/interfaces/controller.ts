import { Router, Request, Response } from "express";
import { Service } from "./service";

abstract class Controller {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): void
}

interface ServiceController extends Controller {
    service: Service;
}

export { Controller, ServiceController }