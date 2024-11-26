import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['ADMIN'],
      default: 'ADMIN',
      required: true
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('Users', userSchema);
export default User;
