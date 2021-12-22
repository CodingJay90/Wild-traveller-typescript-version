import { Router } from "express";
import authRoutes from "./user.route";
import locationRoutes from "./location.routes";
import commentRoutes from "./comment.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/location", locationRoutes);
router.use("/location/:id/comment", commentRoutes);

/** Error handling */
router.use((_, res, __) => {
  const error = new Error("API Endpoint Not found");

  res.status(404).json({
    message: error.message,
  });
});

export default router;
