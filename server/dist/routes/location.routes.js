"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var location_controller_1 = __importDefault(require("../controllers/location.controller"));
var isLoggedIn_1 = __importDefault(require("../middleware/isLoggedIn"));
var router = (0, express_1.Router)();
router.get("/", location_controller_1.default.getLocations); // get all locations
router.post("/create", isLoggedIn_1.default, location_controller_1.default.createLocation); //create location
router.get("/:id", location_controller_1.default.getSpecificLocation); //get specific location
router.put("/update/:id", isLoggedIn_1.default, location_controller_1.default.updateLocation); //update a location
router.delete("/delete/:id", isLoggedIn_1.default, location_controller_1.default.deleteLocation); //delete a locartion
exports.default = router;
