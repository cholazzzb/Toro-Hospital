import mongoose from "mongoose";
import validator from "validator";

const UserProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  gender: String,
  imageId: String,
  role: { type: String, required: true },
});

export default mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);
