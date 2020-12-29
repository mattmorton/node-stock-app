import { Request, Response, NextFunction } from 'express';
import { redisGet, redisSet } from '../services/redis.service';

export const getCache = (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl;
  return redisGet(key).then((data) => {
    if (data) {
      res.json(JSON.parse(data));
    }
    if (!data) {
      console.log('data expired')
      next();
    }
  }).catch((e) => {
    console.log('error', e)
  })
}
