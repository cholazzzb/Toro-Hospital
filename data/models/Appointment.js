import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  description: { type: String, required: true },
  registrants: [String],
  location: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
