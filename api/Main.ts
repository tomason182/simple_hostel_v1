import express, { ErrorRequestHandler, Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import morgan from "morgan";
import "dotenv/config";
import { Pool } from "pg";


export class Main {
	private app: Express;
	private pool: Pool;

	
	constructor(pool: Pool) {
		this.pool = pool;
		this.app = express();

    this.setupMiddlewares();
    this.setupRoutes();
	}


  private setupMiddlewares() {

    // Trust proxy form nginx
    this.app.set("trust proxy", 1);

    const corsOptions = {
      origin: process.env.NODE_ENV === "production" ? ["https://www.simplehostel.net", "https://simplehostel.net"] : ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true
    };

    // Seguridad
    this.app.use(helmet());

    // Login
    this.app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

    // Rate Limit
    const apiLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: "Too many request from this IP, please try again later",
    });

    this.app.use("/api/v1/", apiLimiter);

    // Compresion
    this.app.use(compression());


    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true}));
    this.app.use(cookieParser(process.env.JWT_SECRET));

  };

  private setupRoutes() {
    // Handler para rutas no encontradas
    this.app.use((req, res) => {
      res.status(404).json({error: "Endpoint not found"});
    });

    // Manejo de errores
    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
      let message = "Unexpected goblal error occurred";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(500).json({error: message})

      this.app.use(errorHandler);

    }


    this.app.get("/health", (req, res) => {
      res.json({status: "ok"});
    })
  }

}
