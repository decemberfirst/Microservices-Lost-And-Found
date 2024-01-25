import { Listener } from '@codishrohan/common';
import { Subjects } from '@codishrohan/common';
import { UserCreatedInterface } from './UserCreatedInterface';
import User from '../Modal/User';

export class UserCreatedListener extends Listener<UserCreatedInterface> {
  exchangeName = 'MICROSERVICES';
  routingKey = 'MICROSERVICES';
  subject: Subjects.UserCreated = Subjects.UserCreated;

  async onMessage(message: UserCreatedInterface) {
    if (message.subject == Subjects.UserCreated) {
      await User.create(message.data);
      console.log('Data Replicated');
    }
  }

  start() {
    this.createExchange();
    this.consumeMessage();
    return this;
  }
}
