import { Router } from "express";
import controllers from "../controllers/location.controller";
import isLoggedIn from "../middleware/isLoggedIn";

const router = Router();

router.get("/", controllers.getLocations); // get all locations
router.post("/create", isLoggedIn, controllers.createLocation); //create location
router.get("/:id", controllers.getSpecificLocation); //get specific location

router.put("/update/:id", isLoggedIn, controllers.updateLocation); //update a location
router.delete("/delete/:id", isLoggedIn, controllers.deleteLocation); //delete a locartion

export default router;
