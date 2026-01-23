import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = Router();

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.getDataValue("password"));
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Token includes role
    const token = jwt.sign(
      {
        id: user.getDataValue("id"),
        role: user.getDataValue("role"),
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // ✅ Return role explicitly
    res.json({
      token,
      role: user.getDataValue("role"),
      user: {
        id: user.getDataValue("id"),
        email: user.getDataValue("email"),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ⚠️ TEMPORARY – REMOVE AFTER FIRST USE
 */
router.post("/seed-admin", async (req, res) => {
  const admin = await User.create({
    email: "admin@college.com",
    password: await bcrypt.hash("admin123", 10),
    role: "ADMIN",
  });

  res.json(admin);
});

export default router;
