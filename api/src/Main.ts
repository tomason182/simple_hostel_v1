import express, { ErrorRequestHandler, Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import morgan from "morgan";
import "dotenv/config";
import { Pool } from "pg";

import { EmailServiceSMTP } from "./infraestructure/email/EmailRepositorySMTP";
import { EmailService } from "./services/EmailService";

import { nodeMailerConfig } from "./infraestructure/config/nodeMailerConfig";
import { postgreSQLConfig } from "./infraestructure/config/postgreSQLConfig";

import { requestContextMiddleware } from "./infraestructure/http/middlewares/requestContextMiddleware";

import { createAccountRoutes } from "./infraestructure/http/routes/accountRoutes";
import { createUserRouter } from "./infraestructure/http/routes/userRoutes";


export class Main {
  private app: Express;
  private baseUrl: string = "/api/v1";

  private pool!: Pool;
  private emailService!: EmailService;


  constructor() {
    this.app = express();
  }

  public async run(): Promise<void> {
    console.log("Iniciando servicios...");
    await this.initializeServices();

    console.log("Estableciendo middlewares...");
    this.setupMiddlewares();

    console.log("Estableciendo rutas...");
    this.setupRoutes();

    const port = Number(process.env.PORT) || 3000;

    this.app.listen(port, () => {
      console.log(`Server listening on port ${3000}`);
    });
  }


  private async initializeServices(): Promise<void> {
    console.log("Iniciando base de datos...")
    this.pool = new Pool(postgreSQLConfig());

    console.log("Iniciando servicio SMTP...")
    const emailRepository = await EmailServiceSMTP.create(nodeMailerConfig());

    this.emailService = new EmailService(emailRepository);
  }

  private setupMiddlewares(): void {

    // Trust proxy form nginx
    this.app.set("trust proxy", 1);

    // Seguridad
    this.app.use(helmet());

    // Login
    this.app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

    // Compresion
    this.app.use(compression());

    const corsOptions = {
      origin: process.env.NODE_ENV === "production" ? ["https://www.simplehostel.net", "https://simplehostel.net"] : ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true
    };

    this.app.use(cors(corsOptions));

    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cookieParser(process.env.JWT_SECRET));

    // Rate Limit
    const apiLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: "Too many request from this IP, please try again later",
    });

    this.app.use(this.baseUrl, apiLimiter);


    this.app.use(requestContextMiddleware(this.pool, this.emailService))
  };


  private setupRoutes() {

    this.app.get("/health", (req, res) => {
      res.json({ status: "ok" });
    });

    this.app.use(`${this.baseUrl}/users`, createUserRouter());

    this.app.use(`${this.baseUrl}/account`, createAccountRoutes(this.pool, this.emailService));

    // ...mas rutas




    // Handler para rutas no encontradas
    this.app.use((req, res) => {
      res.status(404).json({ error: "Endpoint not found" });
    });

    // Manejo de errores
    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
      let message = "Unexpected goblal error occurred";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(500).json({ error: message })

      this.app.use(errorHandler);

    }

  }
}
