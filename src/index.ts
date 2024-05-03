import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";
import gracefulShutdown from 'http-graceful-shutdown';
import Logger from './lib/logger';
import { connectToDatabase, getDBConnection } from './configs/db.config';

import healthCheckRoutes from './routes/healthcheck.route';
import userRoutes from './routes/user.route';
import articleRoutes from './routes/article.route';

import UserRepository from './repositories/user.repository';
import UserService from './services/user.service';
import UserController from './controllers/user.controller';

import ArticleRepository from './repositories/article.repository';
import ArticleService from './services/article.service';
import ArticleController from './controllers/article.controller';

const environment = process.env.NODE_ENV || 'local';
const PORT = process.env.PORT || 3000;

export const app = express();

// middleware
app.use(express.json());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create a router for /api prefix and mount routers
const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use(healthCheckRoutes);
apiRouter.use(userRoutes);
apiRouter.use(articleRoutes);

(async () => {
  try {
    // connect to the database before starting the server
    await connectToDatabase();

    // users
    const userRepository = new UserRepository(getDBConnection());
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    app.set('userController', userController);
  
    // articles
    const articleRepository = new ArticleRepository(getDBConnection());
    const articleService = new ArticleService(articleRepository);
    const articleController = new ArticleController(articleService);
     app.set('articleController', articleController);

    // start the Express server
    const server = app.listen(PORT, () => {
      Logger.info(`🚀 [${environment}] ConnectMe API Service listening on port ${PORT} 🚀`);
    });
  
    // set keepAliveTimeout and headersTimeout for graceful shutdown
    server.keepAliveTimeout = 181 * 1000;
    server.headersTimeout = 185 * 1000;

    // enable graceful shutdown
    gracefulShutdown(server);
  } catch (error) {
    Logger.error(`Error encountered starting application`);
    Logger.error(error);
    process.exit(1);
  }
})();