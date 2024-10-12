import express, { Express } from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import orderRoutes from './modules/orders/routes';

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});