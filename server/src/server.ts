import http from "http";
import express from "express";
import logging from "./config/logging";
import config from "./config/config";
import cors from "cors";
import connectDB from "./db.js/database";
import routes from "./routes";

const NAMESPACE = "Server";
const app = express();

connectDB();
/** Log the request */
app.use((req, res, next) => {
  /** Log the req */
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Parse the body of the request */
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", parameterLimit: 100000, extended: true })
);
app.use(cors());

/** Routes go here */
app.use("/api/v2", routes);

const httpServer = http.createServer(app);

httpServer.listen(config.port, () =>
  console.log(`Server is running: ${config.port}`)
);
