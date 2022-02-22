"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resgisterValidator = void 0;
var express_validator_1 = require("express-validator");
var user_model_1 = __importDefault(require("../models/user.model"));
exports.resgisterValidator = [
    (0, express_validator_1.check)("password")
        .isLength({ min: 5 })
        .withMessage("password must be at least 5 characters long"),
    (0, express_validator_1.check)("username").notEmpty().withMessage("Username field cannot be empty"),
    (0, express_validator_1.check)("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid Email")
        .custom(function (value, _a) {
        var req = _a.req;
        return new Promise(function (resolve, reject) {
            user_model_1.default.findOne({ email: req.body.email }, function (err, user) {
                if (err) {
                    reject(new Error("Server Error"));
                }
                if (Boolean(user)) {
                    reject(new Error("E-mail already in use"));
                }
                resolve(true);
            });
        });
    }),
];
