import amqp from 'amqplib';

class Amqp {
  private _channel: amqp.Channel | null = null;

  get client() {
    if (!this._channel) {
      throw new Error('Channel not found');
    }
    return this._channel;
  }

  async connect() {
    const connection = await amqp.connect('amqp://rabbitmq-srv:5672');
    this._channel = await connection.createChannel();
  }
}

export const amqpInstance = new Amqp();
