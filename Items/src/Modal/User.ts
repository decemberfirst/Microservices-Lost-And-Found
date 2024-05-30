import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  username: string;
  profilePicture: string;
  email: string;
  _id: string;
  userLocation: {
    type: string;
    coordinates: [number, number];
  };
  Tokens: number;
}
const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userLocation: {
    type: {
      type: String,
      required: true,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: [true, 'Please provide location coordinates'],
    },
  },
  Tokens: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

UserSchema.index({ userLocation: '2dsphere' });
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
