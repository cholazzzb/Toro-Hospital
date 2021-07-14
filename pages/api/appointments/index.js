import Appointment from "data/models/Appointment";
import dbConnect from "utils/dbConnect";
import mongoose from 'mongoose'

export default async function handler(req, res) {
  const {
    query: {
      // PUT
      profileId,
      // PUT and DELETE
      appointmentId,
    },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        let formData = {
          ...req.body,
          registrants: [],
          availableTime: new Date(req.body.availableTime),
        };
        await Appointment.create(formData);
        res.status(200).json({ success: true });
      } catch (error) {
        console.error(
          `ERR Appointment API (POST) - user id: ${"user ID"}  Error : ${error}`
        );
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const appointments = await Appointment.find({});
        res.status(200).json({ success: true, data: appointments });
      } catch (error) {
        console.error(
          `ERR Appointment API (GET) - user id: ${"user ID"}  Error : ${error}`
        );
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        await Appointment.findByIdAndUpdate(appointmentId, {
          $push: {
            registrants: { profileId: profileId},
          },
        });
        res.status(200).json({ success: true });
      } catch (error) {
        console.error(
          `ERR Appointment API (PUT) - user id: ${profileId}  Error : ${error}`
        );
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        await Appointment.findByIdAndDelete({
          _id: appointmentId,
        });
        res.status(200).json({ success: true });
      } catch (error) {
        console.error(
          `ERR Appointment API (DELETE) - user id: ${profileId}  Error : ${error}`
        );
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
