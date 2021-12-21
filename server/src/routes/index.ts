import { Router } from "express";
import authRoutes from "./user.route";

const router = Router();

router.use("/auth", authRoutes);

/** Error handling */
router.use((_, res, __) => {
  const error = new Error("API Endpoint Not found");

  res.status(404).json({
    message: error.message,
  });
});

export default router;
