import app from "./app";
import { sequelize } from "./models";
import authRoutes from "./routes/auth.routes";
import attendanceRoutes from "./routes/attendance.routes";

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(8080, () => {
    console.log("Server running on port 8080");
  });
});