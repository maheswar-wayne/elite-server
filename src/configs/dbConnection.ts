/**
    @description: Database connection
    @author: [maheswar-wayne, sant]
*/

import mongoose from 'mongoose';

mongoose.connection.once('connected', () => {
  console.log('🌿 db connected successfully');
});

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connection;
