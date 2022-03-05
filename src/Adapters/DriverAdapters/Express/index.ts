import express, { Express } from "express";
import cors from "cors";

import router from "./routes";
import { connectToDb } from "../../DrivenAdapters/Persistence/_SETUP_/Mongo";

const startExpressServer = async () => {
  const app: Express = express();

  // configs
  require("dotenv").config();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // initialize the routes
  app.use("/api", router);

  connectToDb()
    .then(() => {
      const PORT: number | string = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`server is listening on post ${PORT}`);
      });
    })
    .catch((error) => {
      console.log("DB connection error", error);
    });
};

export { startExpressServer };
