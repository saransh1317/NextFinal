import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");
}).catch((err) => {
  console.log({ err });
});
const server = app.listen(2500, () => {
  const address = server.address();
  if (address && typeof address === 'object') {
    console.log(`Server is listening at http://${address.address === '::' ? 'localhost' : address.address}:${address.port}`);
  } else {
    console.log(`Server is listening`);
  }
});