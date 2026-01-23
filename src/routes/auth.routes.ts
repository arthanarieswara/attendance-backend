import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid" });

  const ok = await bcrypt.compare(password, user.getDataValue("password"));
  if (!ok) return res.status(401).json({ message: "Invalid" });

  const token = jwt.sign(
    { id: user.getDataValue("id"), role: user.getDataValue("role") },
    process.env.JWT_SECRET!
  );

  res.json({ token });
});

router.post("/seed-admin", async (req, res) => {
  const bcrypt = require("bcryptjs");

  const admin = await User.create({
    email: "admin@college.com",
    password: await bcrypt.hash("admin123", 10),
    role: "ADMIN"
  });

  res.json(admin);
});


export default router;