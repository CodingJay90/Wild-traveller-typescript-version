"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var cors_1 = __importDefault(require("cors"));
var database_1 = __importDefault(require("./db.js/database"));
var routes_1 = __importDefault(require("./routes"));
var NAMESPACE = "Server";
var app = (0, express_1.default)();
(0, database_1.default)();
/** Log the request */
app.use(function (req, res, next) {
    /** Log the req */
    logging_1.default.info(NAMESPACE, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    res.on("finish", function () {
        /** Log the res */
        logging_1.default.info(NAMESPACE, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - STATUS: [").concat(res.statusCode, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    });
    next();
});
/** Parse the body of the request */
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", parameterLimit: 100000, extended: true }));
app.use((0, cors_1.default)());
/** Routes go here */
app.use("/api/v2", routes_1.default);
var httpServer = http_1.default.createServer(app);
httpServer.listen(config_1.default.port, function () {
    return console.log("Server is running: ".concat(config_1.default.port));
});
