import express, { Express } from "express";
import { env } from "./env";
import ShopController from "../controllers/shopController";
import { RouteConstants } from "../data/constants/routes";

export default class ApiInitializer {
    public app: Express;
    private port: number = env.PORT || 3000;

    // there will be a property of the class called userCredentials
    // it will be filled by a middleware, called credentialParserMiddleware
    // it will be passed to mountControllers method as parameter, then passed 
    // onto individual controllers and then onto services as parameters in constructor.
    // It will be used to fill audit fields and some isolation checks.

    constructor() {
        this.app = express();
        this.registerMiddleware();
        this.mountControllers();
    }

    private mountControllers() {
        var shopController = new ShopController();

        this.app.use(RouteConstants.SHOP_ROUTE, shopController.router);
    }

    private registerMiddleware() {
        this.app.use(express.json());
    }

    public run(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
          });
    }
    
}