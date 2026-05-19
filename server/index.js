import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./src/routes/index.js";
import * as dns from "node:dns";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);
app.get("/",(req,res)=>{
  res.send("Backend is working perfectly")
})
// const mongoose = require('mongoose');
// Start app after connecting to MongoDB
mongoose.set('strictQuery', true);
dns.setServers(['8.8.8.8', '1.1.1.1']);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Mongodb connected');

    const port = process.env.PORT;
    const server = app.listen(port, () => {
      const address = server.address();
      if (address && typeof address === 'object') {
        console.log(`Server is listening at http://${address.address === '::' ? 'localhost' : address.address}:${address.port}`);
      } else {
        console.log(`Server is listening`);
      }
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

startServer();
