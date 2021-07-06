import User from "data/models/User";
import dbConnect from "utils/dbConnect";

export default async function signup(req, res) {
  const {
    query: {},
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newUser = await User.create(req.body);
        const token = await newUser.generateAuthToken();
        res.status(201).send({ success: true, token });
      } catch (error) {
        console.error(`ERR Signup API - Error:${error}`);
        res.status(400).json({ success: false });
      }
      break;

    default:
      console.error(`ERR Signup API - Error:${error}`);
      res.status(400).json({ success: false });
      break;
  }
}
