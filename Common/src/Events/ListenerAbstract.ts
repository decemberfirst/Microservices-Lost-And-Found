import { Channel, Message } from 'amqplib';
import { Subjects } from './SubjectsEnum';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  private channel: Channel;

  abstract exchangeName: string;
  abstract onMessage(message: any): Promise<void>;
  abstract routingKey: string;
  abstract subject: T['subject'];

  constructor(channelInstance: Channel) {
    this.channel = channelInstance;
  }

  async createExchange() {
    this.channel.assertExchange(this.exchangeName, 'direct', { durable: true });
  }

  async consumeMessage() {
    const queueInstance = await this.channel.assertQueue('', {
      exclusive: true,
    });
    this.channel.bindQueue(
      queueInstance.queue,
      this.exchangeName,
      this.routingKey
    );
    this.channel.consume(queueInstance.queue, async (message) => {
      if (message) {
        const parsedMessage = this.parseMessage(message);
        await this.onMessage(parsedMessage);
        this.channel.ack(message);
      }
    });
  }

  private parseMessage(message: Message) {
    return JSON.parse(message.content.toString());
  }
}
