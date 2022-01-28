import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.ATLAS_URI);
    console.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Connection error: ${error.message || error} `);
    process.exit(1);
  }
};

export default connectToDB;
