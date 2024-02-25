import User from '../Modal/User';
import { issueJWT } from '../utils/IssueJWT';
import { randomBytes, createHash } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { CatchAsync, AppError } from '@codishrohan/common';
import { UserCreatedPublisher } from '../Events/UserCreatedPublisher';
import { amqpInstance } from '@codishrohan/common';
import { Subjects } from '@codishrohan/common';

const register = CatchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = new User(request.body);

    const verificationToken = randomBytes(3).toString('hex');
    newUser.AccountVerificationToken = createHash('sha256')
      .update(verificationToken)
      .digest('hex');

    await newUser.save();

    new UserCreatedPublisher(amqpInstance.client).start().publishMessage({
      subject: Subjects.UserCreated,
      data: {
        username: newUser.username,
        email: newUser.email,
        _id: newUser.id,
        profilePicture: newUser.profilePicture,
        userLocation: newUser.userLocation,
        verificationToken,
      },
    });

    response.status(201).json({
      message: 'Account created successfully',
      user: newUser,
    });
  }
);

const login = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError('Please provide email and password both', 400));

    const userDoc = await User.findOne({ email });
    if (
      !userDoc ||
      !(await userDoc.comparePassword(password, userDoc.password))
    )
      return next(new AppError('Invalid email or password', 401));

    if (!userDoc.isVerified)
      return res.status(401).json({
        isVerified: false,
        message: 'Please verify your account first',
      });

    const token = issueJWT({
      id: userDoc._id,
      email: userDoc.email,
      username: userDoc.username,
    });

    res.cookie('jwt', token, { httpOnly: true });

    res.status(200).json({
      message: 'Logged in successfully',
    });
  }
);

const currentUser = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError('User not found', 404));

    res.status(200).json({
      currentUser: user,
    });
  }
);

const logout = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('jwt');
    res.status(200).json({
      message: 'Logged out successfully',
    });
  }
);

const verifyAccount = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    if (!token) return next(new AppError('Please provide token', 400));
    const hashedToken = createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      AccountVerificationToken: hashedToken,
      id: req.user?.id,
    });
    if (!user) return next(new AppError('Invalid token', 400));

    user.isVerified = true;
    user.AccountVerificationToken = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      message: 'Account verified successfully',
    });
  }
);

const autoLogin = CatchAsync(
  async (req: Request, response: Response, next: NextFunction) => {
    response.status(200).json({
      userId: req.user?.id,
    });
  }
);

export { register, login, currentUser, logout, verifyAccount, autoLogin };
