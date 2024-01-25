import { UserCreatedListener } from './Events/UserCreatedListener';
import { amqpInstance } from '@codishrohan/common';
import app from './app';
import { ItemRegisteredListener } from './Events/ItemRegisteredListener';

amqpInstance.connect();
app.listen(3002, async () => {
  console.log('SMS server listening on port 3002');
  await amqpInstance.connect();
  console.log('Connected to RabbitMQ : EMAIL');
  new UserCreatedListener(amqpInstance.client).start();
  new ItemRegisteredListener(amqpInstance.client).start();
});
