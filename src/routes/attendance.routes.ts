import { Router } from "express";
import { Attendance } from "../models/Attendance";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, async (req: any, res) => {
  const record = await Attendance.create({
    date: new Date(),
    status: req.body.status,
    userId: req.user.id
  });
  res.json(record);
});

export default router;