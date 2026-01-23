import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Attendance extends Model {}

Attendance.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date: DataTypes.DATEONLY,
  status: DataTypes.STRING
}, {
  sequelize,
  modelName: "attendance"
});