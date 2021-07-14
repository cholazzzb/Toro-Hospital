import mongoose from "mongoose";
import Appointment from "data/models/Appointment";
import User from "data/models/User";
import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  const {
    query: { appointmentId },
    method,
  } = req;

  await dbConnect();
  switch (method) {
    case "GET":
      try {
        if (appointmentId) {
          const registrants = await Appointment.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(appointmentId) } },
            { $unwind: "$registrants" },
            {
              $project: {
                profileId: { $toObjectId: "$registrants.profileId" },
              },
            },
            {
              $lookup: {
                localField: "profileId",
                from: "users",
                foreignField: "_id",
                as: "userProfile",
              },
            },
            { $unwind: "$userProfile" },
          ]);
          res.status(200).json({ success: true, data: registrants });
        } else {
          const users = await User.find({ role: "Patient" });
          res.status(200).json({ success: true, data: users });
        }
      } catch (error) {
        console.error(
          `ERR /api/registrants (GET) - user id:  Error : ${error}`
        );
        res.status(400).json({ success: false });
      }
      break;

    default:
      break;
  }
}
