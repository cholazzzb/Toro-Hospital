import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState) {
    return;
  } else {
    console.info("initializing connection to db");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }
}

export default dbConnect;
