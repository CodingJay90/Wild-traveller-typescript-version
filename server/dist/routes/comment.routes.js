"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
var isLoggedIn_1 = __importDefault(require("../middleware/isLoggedIn"));
var router = (0, express_1.Router)({ mergeParams: true });
router.post("/create", isLoggedIn_1.default, comment_controller_1.default.createComment); //create comment
router.get("/:comment_id", isLoggedIn_1.default, comment_controller_1.default.getSpecificComment); //get specific comment
router.put("/:comment_id", isLoggedIn_1.default, comment_controller_1.default.updateComment); //update a comment
router.delete("/:comment_id", isLoggedIn_1.default, comment_controller_1.default.deleteComment); //delete a comment
exports.default = router;
