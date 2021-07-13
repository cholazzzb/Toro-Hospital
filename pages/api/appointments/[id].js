import Appointment from "data/models/Appointment";
import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  /**
   * query: {
   * 1. id:
   * {
   * // GET :
   *  appointmentId (doctor type) or registrantsId (patient type)
   * // PUT :
   *
   * }
   * {
   * 2. type: // doctor or patient}
   * }
   */
  const {
    query: { id, type, profileId },
    method,
  } = req;

  await dbConnect();
  switch (method) {
    case "GET":
      switch (type) {
        case "patient":
          try {
            const appointment = await Appointment.findOne({
              registrants: { $elemMatch: { profileId: id } },
            });
            res.status(200).json({ success: true, data: appointment });
          } catch (error) {
            `ERR api/appointments/[id] type:patient (GET) Error : `, error;
            res.status(200).json({ success: false });
          }
          break;

        case "doctor":
          try {
            const appointment = await Appointment.findById(id);
            console.log("WHUTTT", appointment);
            res.status(200).json({ success: true, data: appointment });
          } catch (error) {
            `ERR api/appointments/[id] type:doctor (GET) Error : `, error;
            res.status(200).json({ success: false });
          }
          break;

        default:
          break;
      }
      break;

    case "PUT":
      switch (type) {
        case "patient":
          try {
            await Appointment.findByIdAndUpdate(id, {
              $pull: {
                registrants: { profileId: profileId },
              },
            });
            res.status(200).json({ success: true });
          } catch (error) {
            console.error(
              `ERR api/appointments/[id] type:patient (PUT) Error : `,
              error
            );
            res.status(400).json({ success: false });
          }

          break;

        default:
          break;
      }
      break;

    default:
      break;
  }
}
