import User from "data/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "utils/dbConnect";
import { setTokenCookie } from "utils/auth-cookies";

export default async function login(req, res) {
  const {
    query: {},
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error({ error: "Invalid login credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          throw new Error({ error: "Invalid login credentials" });
        }
        if (!user) {
          return res
            .status(401)
            .json({ error: "Login failed! Check authentication credentials" });
        }
        const token = await user.generateAuthToken();
        setTokenCookie(res, token);
        res.status(201).json({ success: true });
      } catch (error) {
        console.error(`ERR /auth/login API - Error:${error}`, error);
        res
          .status(401)
          .json({ error: "Login failed! Check authentication credentials" });
      }
      break;

    default:
      console.error(`ERR /auth/login API - Error:Method = ${method}}`);
      res.status(400).json({ success: false });

      break;
  }
}
