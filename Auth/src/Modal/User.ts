import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  confirmPassword: string | undefined;
  profilePicture: string;
  isVerified: boolean;
  AccountVerificationToken: string | undefined;
  userLocation: {
    type: string;
    coordinates: [number, number];
  };

  comparePassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [20, 'Username must not exceed 20 characters'],
      unique: [true, 'Username already exists, choose another one'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: [validator.isEmail, 'Invalid email address'],
      unique: [true, 'Email already exists, choose another one'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: 6,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Confirm your password'],
      validate: {
        validator: function (this: IUser, el: string) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    profilePicture: {
      type: String,
      default:
        'https://icon-library.com/images/default-user-icon/default-user-icon-11.jpg',
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
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
    AccountVerificationToken: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        delete ret.AccountVerificationToken;
      },
    },
  }
);

UserSchema.index({ username: 'text' }, { unique: true });

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isNew || !this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
