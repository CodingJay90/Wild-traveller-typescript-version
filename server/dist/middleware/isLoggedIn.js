"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var isLoggedIn = function (req, res, next) {
    var token = req.header("Authorization");
    if (!token)
        return res.status(401).json({ error: "No token found" });
    try {
        var verified = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        req.user = verified.user;
        next();
    }
    catch (err) {
        res.status(400).json({ error: "invalid token" });
    }
};
exports.default = isLoggedIn;
