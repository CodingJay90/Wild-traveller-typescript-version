import { Router } from "express";
import controllers from "../controllers/comment.controller";
import isLoggedIn from "../middleware/isLoggedIn";

const router = Router({ mergeParams: true });

router.post("/create", isLoggedIn, controllers.createComment); //create comment
router.get("/:comment_id", isLoggedIn, controllers.getSpecificComment); //get specific comment

router.put("/:comment_id", isLoggedIn, controllers.updateComment); //update a comment
router.delete("/:comment_id", isLoggedIn, controllers.deleteComment); //delete a comment

export default router;
