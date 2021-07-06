import Appointment from "data/models/Appointment";
import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  const {
    query: {},
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newAppointment = await Appointment.create(req.body);
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
      break;
    case "DELETE":
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
