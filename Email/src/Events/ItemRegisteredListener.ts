import { Listener, Subjects } from '@codishrohan/common';
import { ItemRegisteredInterface } from './ItemRegisteredInterface';
import { EMAIL_API } from '../Service/SMS_API';
import mail_config from '../mail-config';
import { ItemTemplate } from '../EmailTemplate/Item';

export class ItemRegisteredListener extends Listener<ItemRegisteredInterface> {
  exchangeName = 'MICROSERVICES';
  routingKey = 'MICROSERVICES';
  email: EMAIL_API | null = null;

  subject: Subjects.ItemCreated = Subjects.ItemCreated;

  async onMessage(msg: ItemRegisteredInterface) {
    if (msg.subject == Subjects.ItemCreated) {
      msg.data.nearByUsers.forEach(async (user) => {
        await this.email?.send({
          from: 'ping.techyrohan@gmail.com',
          to: `${user.email}`,
          subject: 'Item Notification',
          text: 'Test',
          html: ItemTemplate({
            type: msg.data.type,
            itemCategory: msg.data.itemCategory,
            itemLink: msg.data.itemLink,
          }),
        });
      });
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
