
import redis from 'redis';
import { promisify } from 'util';
import moment from 'moment';

const redisClient = redis.createClient(6379);

export const redisGet = (key: string): Promise<string> => {
  const redisGetAsync = promisify(redisClient.get).bind(redisClient);
  return redisGetAsync(key);
}

export const redisSet = (key: string, data: any, expiresAtEndOf: moment.unitOfTime.StartOf = 'day') => {
  const expiresAt = setExpiryDate(expiresAtEndOf);
  return redisClient.setex(key, expiresAt, JSON.stringify(data));
}

export const redisDel = (key: string) => {
  return redisClient.del(key);
}

export const redisFlushDb = () => {
  return redisClient.flushdb();
}

export const redisInfo = () => {
  const redisInfoAsync = promisify(redisClient.info).bind(redisClient);
  return redisInfoAsync();
}

export const setExpiryDate = (period: moment.unitOfTime.StartOf) => {
  const diff = moment().diff(moment().endOf(period), 'seconds');
  return Math.abs(diff);
}