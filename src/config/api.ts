import express, { Express } from "express";
import { env } from "./env";
import ShopController from "../controllers/shopController";
import { RouteConstants } from "../data/constants/routes";

export default class ApiInitializer {
    public app: Express;
    private port: number = env.PORT || 3000;

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
            console.log(`Server is running on http://localhost:${PORT}`);
          });
    }
    
}

const app = express();
const PORT = env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript!');
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });