import { app } from './app';
import mongoose from 'mongoose';
import { amqpInstance } from '@codishrohan/common';

const CONNECT_DB = async () => {
  await amqpInstance.connect();
  await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
};

function message(msg: any) {
  console.log(msg);
}

CONNECT_DB()
  .then(async () => {
    console.log('Connected to AUTH MongoDB');
    app.listen(3000, async () => {
      console.log('Auth service started at port 3000');
    });
  })
  .catch((err) => console.log(err));
