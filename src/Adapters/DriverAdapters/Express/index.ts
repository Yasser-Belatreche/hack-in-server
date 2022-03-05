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

  const PORT: number | string = process.env.PORT || 5000;

  connectToDb()
    .then((client) => {
      console.log("DB connected");

      app.listen(PORT, () => {
        console.log(`server is running at ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(`DB connections error, ${error}`);
    });
};

export { startExpressServer };
