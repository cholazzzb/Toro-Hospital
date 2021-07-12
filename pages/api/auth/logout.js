import User from "data/models/User";
import { removeTokenCookie } from "utils/auth-cookies";
import dbConnect from "utils/dbConnect";

export default async function logout(req, res) {
  const {
    query: { username },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOneAndUpdate(
          { username: username },
          { $set: { tokens: [] } }
        );
        removeTokenCookie(res);
        res.status(201).json({ success: true });
        break;
      } catch (error) {}
    default:
      console.error(`ERR /auth/logout API - Error:Method = ${method}}`);
      res.status(400).json({ success: false });

      break;
  }
}
