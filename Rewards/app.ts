import express from 'express';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { CatchAsync, errorHandler } from '@codishrohan/common';

const app = express();
const stripe = new Stripe(
  'sk_test_51OPmAbSHibRTXsSWvAz91zE87PPmYyyAfjnYT0Gnsi8lscK646L489FRxziDVKixVyPxbx5R0cJeAwGOBdSuhJeA00SnhejctX'
);

app.use(cookieParser());
app.use(express.json());

app.post('/charge', async (req: Request, res: Response) => {
  try {
    const { id, amount } = req.body;
    await stripe.paymentIntents.create({
      currency: 'usd',
      amount: amount * 1000,
      //   source: 'tok_visa',
      description: 'Test Charge',
      payment_method_types: ['card'],
      payment_method: 'pm_card_visa',
      confirm: true,
    });

    res.send({ message: 'Success' });
  } catch (error: any) {
    console.error('Error creating charge:', error.message);
    res.status(500).send({ error: 'Error creating charge' });
  }
});

app.use(errorHandler);

export { app };
