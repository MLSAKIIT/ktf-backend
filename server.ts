import express, { Express } from "express";
import cors from "cors";
import router from "./router";
import { connect, ConnectOptions, disconnect } from "mongoose";
import morgan from "morgan";
import { logger, seedData } from "@utils";

// Configs
const PORT = process.env.PORT || 8000;
const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost/ktf";

// Middleware
const createAppWithMiddleware = (): Express => {
  const app = express();
  app.use(
    morgan(
      `[:date[web]] :method :url :remote-addr :status :res[content-length] - :response-time ms HTTP/:http-version`,
    ),
  );
  app.use(cors());
  app.use(express.json());
  app.use("/", router);
  return app;
};

// Database
const connectToDB = async () => {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (error) {
    console.log(error);
  }
};

// App
const main = () => {
  try {
    const app = createAppWithMiddleware();
    connectToDB().then(() => {
      logger("MongoDb connected");
    });
    // seedData().then(() => {
    //   logger("Event and Merch Data seeded");
    // });
    app.listen(PORT, () => {
      logger(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();

const closeApp = () => {
  disconnect().then(() => {
    logger("MongoDb disconnected");
    process.exit();
  });
};

process.on("SIGTERM", closeApp);
process.on("SIGINT", closeApp);
