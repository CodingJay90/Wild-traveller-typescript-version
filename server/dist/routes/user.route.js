"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var validator_1 = require("../utils/validator");
var isLoggedIn_1 = __importDefault(require("../middleware/isLoggedIn"));
var router = (0, express_1.Router)();
router.post("/users", validator_1.resgisterValidator, user_controller_1.default.createUser); // resgister
router.post("/sessions", user_controller_1.default.loginUser); //login
router.get("/sessions", isLoggedIn_1.default, user_controller_1.default.accessUser); //access user
router.get("/sessions/:id", user_controller_1.default.getSpecificUser); //get specific user
router.put("/user/update", isLoggedIn_1.default, user_controller_1.default.updateUser); //update a user
router.delete("user/delete", isLoggedIn_1.default, user_controller_1.default.deleteUser); //delete a user
exports.default = router;
