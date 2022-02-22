"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};
var MONGO_HOST = process.env.MONGO_URL || "mongodb://localhost/wild_traveller_typescript";
var config = {
    mongo: MONGO_HOST,
    mongoOptions: MONGO_OPTIONS,
    port: process.env.PORT || 5000,
    jwt_secret: (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "",
};
exports.default = config;
