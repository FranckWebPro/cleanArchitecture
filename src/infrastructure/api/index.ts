import bodyParser from "body-parser";
import express from "express";

import config from "./api.config";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}`);
});
server.on("error", console.error);
