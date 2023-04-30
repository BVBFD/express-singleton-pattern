import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

class Server {
  private app: express.Application;
  constructor() {
    dotenv.config();
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {}

  private setMiddleWare() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
        credentials: true,
      })
    );
    this.app.use(helmet());
    this.app.use(morgan('tiny'));

    this.setRoute();

    this.app.use((req, res, next) => {
      console.log('This is Error MiddleWare!!');
      res.status(404).json({ error: '404 not found error' });
    });
  }

  private connectMongoDB() {
    if (process.env.MONGO_DB_URL) {
      mongoose
        .connect(process.env.MONGO_DB_URL)
        .then(() => {
          console.log('MongoDB has been connected!!');
        })
        .catch((error) => console.error(error));
    }
  }

  public listen() {
    this.setMiddleWare();
    this.connectMongoDB();
    this.app.listen(8080, () => {
      console.log('Server is Connected On...');
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
