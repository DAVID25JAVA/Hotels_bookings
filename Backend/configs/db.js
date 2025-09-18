import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/hotel-booking`
      );
    // console.log(`${process.env.MONGODB_URI}/hotel-booking`);
    
  } catch (error) {
    console.log("mongoose connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
