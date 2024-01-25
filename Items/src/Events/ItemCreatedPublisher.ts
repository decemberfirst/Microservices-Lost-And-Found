import { Publisher } from '@codishrohan/common';
import { Subjects } from '@codishrohan/common';
import { ItemCreatedInterface } from './ItemCreatedInterface';

export class ItemCreatedPublisher extends Publisher<ItemCreatedInterface> {
  subject: Subjects.ItemCreated = Subjects.ItemCreated;
  exchangeName = 'MICROSERVICES';
  routingKey = 'MICROSERVICES';

  start() {
    this.createExchange();
    return this;
  }
}
