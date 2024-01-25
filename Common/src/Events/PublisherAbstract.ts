import { Channel } from 'amqplib';
import { Subjects } from './SubjectsEnum';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  private channel: Channel;

  abstract exchangeName: string;
  abstract routingKey: string;
  abstract subject: T['subject'];

  constructor(channelInstance: Channel) {
    this.channel = channelInstance;
  }

  createExchange() {
    this.channel.assertExchange(this.exchangeName, 'direct', { durable: true });
  }

  async publishMessage(message: any) {
    this.channel.publish(
      this.exchangeName,
      this.routingKey,
      Buffer.from(JSON.stringify(message))
    );
  }
}
