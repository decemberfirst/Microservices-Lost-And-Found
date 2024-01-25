import { Subjects } from '@codishrohan/common';

export interface UserCreatedInterface {
  subject: Subjects.UserCreated;
  data: {
    _id: string;
    email: string;
    profilePicture: string;
    username: string;
    verificationToken: string;
  };
}
