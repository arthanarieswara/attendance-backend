import sequelize from "../config/db";
import { User } from "./User";
import { Attendance } from "./Attendance";

User.hasMany(Attendance);
Attendance.belongsTo(User);

export { sequelize, User, Attendance };