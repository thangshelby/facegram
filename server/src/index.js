
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import route from "./route/index.js";
import dotenv from "dotenv";
import db from "./config/connect/index.js";
import {app, server } from "./socket/socket.js";

const port = 5000;

db.connect();
dotenv.config();
app.use(bodyParser.json({ limit: "1000mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(cors());
app.use(morgan("combined"));


route(app);


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
