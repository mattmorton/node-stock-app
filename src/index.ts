import express from 'express';
import { AlphaVantageRouter } from './routes/alpha-vantage.router';
import { redisFlushDb, redisInfo } from './services/redis.service';

const app = express();
const port = 3000;

app.use('/', new AlphaVantageRouter().router)

app.listen(port, () => {
  // redisFlushDb();
  return console.log(`server is listening on ${port}`);
});