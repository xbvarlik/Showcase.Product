import express, { Express } from "express";
import { env } from "./env";
import { RouteConstants } from "../data/constants/routes";
import ShopController from "../controllers/shopController";
import ProductController from "../controllers/productController";
import ProductCategoryController from "../controllers/productCategoryController";
import ProductUpperCategoryController from "../controllers/productUpperCategoryController";
import { LikedListController } from "../controllers/likedListController";

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
        var productController = new ProductController();
        var productCategoryController = new ProductCategoryController();
        var productUpperCategoryController = new ProductUpperCategoryController();
        var likedListController = new LikedListController();

        this.app.use(RouteConstants.SHOP_ROUTE, shopController.router);
        this.app.use(RouteConstants.PRODUCT_ROUTE, productController.router);
        this.app.use(RouteConstants.PRODUCT_CATEGORY_ROUTE, productCategoryController.router);
        this.app.use(RouteConstants.PRODUCT_UPPER_CATEGORY_ROUTE, productUpperCategoryController.router);
        this.app.use(RouteConstants.LIKED_LIST, likedListController.router);
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