import mongoose from 'mongoose';
import { app } from './app';
import { amqpInstance } from '@codishrohan/common';
import { UserCreatedListener } from './Events/UserCreatedListener';

const CONNECT_DB = async () => {
  await mongoose.connect(
    'mongodb+srv://rohantiwari:rohantiwari@items.mzpzfgi.mongodb.net/?retryWrites=true&w=majority'
  );
  await amqpInstance.connect();
};

CONNECT_DB()
  .then(() => {
    console.log('Connected to ITEM MongoDB');
    app.listen(3001, async () => {
      console.log('Server listening on port 3001');
      new UserCreatedListener(amqpInstance.client).start();
    });
  })
  .catch((err) => console.log(err));
