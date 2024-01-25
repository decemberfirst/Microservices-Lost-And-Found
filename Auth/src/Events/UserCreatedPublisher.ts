import { Publisher } from '@codishrohan/common';
import { Subjects } from '@codishrohan/common';
import { UserCreatedInterface } from './UserCreatedInterface';

class UserCreatedPublisher extends Publisher<UserCreatedInterface> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  exchangeName = 'MICROSERVICES';
  routingKey = 'MICROSERVICES';

  start() {
    this.createExchange();
    return this;
  }
}

export { UserCreatedPublisher };
