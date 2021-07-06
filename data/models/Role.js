import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  roleName: String,
  permission: [String],
});

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
