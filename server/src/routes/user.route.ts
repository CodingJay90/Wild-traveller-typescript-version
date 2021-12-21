import { Router } from "express";
import controllers from "../controllers/user.controller";
import { resgisterValidator } from "../utils/validator";
import isLoggedIn from "../middleware/isLoggedIn";

const router = Router();

router.post("/users", resgisterValidator, controllers.createUser); // resgister
router.post("/sessions", controllers.loginUser); //login
router.get("/sessions", isLoggedIn, controllers.accessUser); //access user
router.get("/sessions/:id", isLoggedIn, controllers.getSpecificUser); //get specific user

router.put("/user/update", isLoggedIn, controllers.updateUser); //update a user
router.delete("user/delete", isLoggedIn, controllers.deleteUser); //delete a user

export default router;
