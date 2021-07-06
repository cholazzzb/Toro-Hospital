import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  const {
    query: {},
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        console.info();
      } catch (error) {
        console.error();
      }
      break;

    default:
      console.error();
      res.status(400).json({ success: false });
      break;
  }
}
