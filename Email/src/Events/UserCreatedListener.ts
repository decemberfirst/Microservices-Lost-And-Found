import { Listener } from '@codishrohan/common';
import { Subjects } from '@codishrohan/common';
import { UserCreatedInterface } from './UserCreatedInterface';
import { EMAIL_API } from '../Service/SMS_API';
import mail_config from '../mail-config';
import { emailVerification } from '../EmailTemplate/EmailVerification';

export class UserCreatedListener extends Listener<UserCreatedInterface> {
  exchangeName = 'MICROSERVICES';
  routingKey = 'MICROSERVICES';
  subject: Subjects.UserCreated = Subjects.UserCreated;
  email: EMAIL_API | null = null;

  async onMessage(message: UserCreatedInterface) {
    if (message.subject == Subjects.UserCreated) {
      const {
        data: { email, username, verificationToken },
        subject,
      } = message;

      await this.email?.send({
        from: 'ping.techyrohan@gmail.com',
        to: `${email}`,
        subject: 'Email Verification',
        text: 'Test',
        html: emailVerification({
          username,
          token: verificationToken,
          expiresIn: '5m',
        }),
      });
      console.log('Email sent');
    }
  }

  start() {
    this.createExchange();
    this.consumeMessage();
    this.email = new EMAIL_API();
    this.email.connect(mail_config);
    return this;
  }
}
