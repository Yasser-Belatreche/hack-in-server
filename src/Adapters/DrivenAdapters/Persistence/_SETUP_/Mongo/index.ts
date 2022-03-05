import mongoose from "mongoose";

const connectToDb = async () => {
  const uri = process.env.MONGO_DB_URI;
  if (!uri) throw new Error("should provide a db uri");

  return await mongoose.connect(uri);
};

export { connectToDb };
