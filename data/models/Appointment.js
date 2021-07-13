import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  description: String,
  specialist: { type: String, required: true },
  registrants: [
    {
      profileId: { type: String, required: true },
    },
  ],
  location: { type: String, required: true },
  availableTime: [{ type: Date, required: true }],
});

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
