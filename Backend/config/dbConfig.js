import mongoose from 'mongoose';

export const connection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/haritBazaardb');
    // await mongoose.connect("mongodb+srv://04anasshaikh04:anasshaikh04@cluster0.lzmbh.mongodb.net/test1?retryWrites=true&w=majority&appName=Cluster0");
    console.log("mongodb connected.......")
  } catch (err) {
    console.log(err);
  }
};

connection();
