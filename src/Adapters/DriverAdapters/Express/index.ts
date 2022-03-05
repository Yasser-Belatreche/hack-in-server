import express, { Express } from "express";
import cors from "cors";

import router from "./routes";

const startExpressServer = () => {
  const app: Express = express();

  // configs
  require("dotenv").config();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // initialize the routes
  app.use("/api", router);

  const PORT: number | string = process.env.PORT || 5000;
  return app.listen(PORT, () => {
    console.log(`server is listening on post ${PORT}`);
  });
};

export { startExpressServer };
