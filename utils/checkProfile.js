import User from "data/models/User";
import jwt from "jsonwebtoken";

export default async function checkProfile(req) {
  const cookies = req.headers.cookie;
  if (cookies) {
    const token = cookies.substring(6, cookies.length);
    const data = jwt.verify(token, process.env.JWT_KEY);
    console.log('ID', data._id)
    try {
      const user = await User.findOne({ _id: data._id, "tokens.token": token });
      if (!user) {
        throw new Error();
      }
      return { username: user.username, role: user.role };
    } catch (error) {
      console.error(`ERR utils/checkProfile API - Error:${error}`);
      return { username: "", role: "" };
    }
  } else {
    console.error(`ERR utils/checkProfile API - Cookies in null`);
    return { username: "", role: "" };
  }
}
