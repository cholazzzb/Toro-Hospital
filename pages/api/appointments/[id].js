import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  const {
    query: {},
    method,
  } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      break;

    default:
      break;
  }
}
