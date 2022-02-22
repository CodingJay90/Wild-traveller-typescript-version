"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_route_1 = __importDefault(require("./user.route"));
var location_routes_1 = __importDefault(require("./location.routes"));
var comment_routes_1 = __importDefault(require("./comment.routes"));
var router = (0, express_1.Router)();
router.use("/auth", user_route_1.default);
router.use("/location", location_routes_1.default);
router.use("/location/:id/comment", comment_routes_1.default);
/** Error handling */
router.use(function (_, res, __) {
    var error = new Error("API Endpoint Not found");
    res.status(404).json({
        message: error.message,
    });
});
exports.default = router;
