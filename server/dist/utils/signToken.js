"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
function generateToken(user) {
    var payload = {
        user: {
            _id: user._id,
            email: user.email,
            username: user.username,
        },
    };
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt_secret, { expiresIn: "24hr" });
}
exports.generateToken = generateToken;
