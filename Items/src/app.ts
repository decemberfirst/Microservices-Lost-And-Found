import express from 'express';
import cookieParser from 'cookie-parser';
import { ItemRoutes } from './Routes/ItemRoutes';
import { errorHandler } from '@codishrohan/common';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());

app.use('/api/v1/items', ItemRoutes);
app.use(errorHandler);

export { app };
