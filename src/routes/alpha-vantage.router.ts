import { getCache } from '../middleware/cache';
import { getAlphaVantage } from '../services/alpha-vantage.service';
import { redisSet } from '../services/redis.service';
import { AlphaVantageFunctions } from '../services/models'

import { Router, Request, Response, NextFunction } from 'express';

export class AlphaVantageRouter {

  public router: Router = Router();

  constructor() {
    this.init();
  }

  private getData = (req: Request, res: Response, next: NextFunction) => {
    getAlphaVantage(req.query).then((data) => {
      redisSet(req.originalUrl, data.data);
      res.json(data.data);
    }).catch((e) => {
      res.send(e)
    })
  }

  private getFundamentalData = (req: Request, res: Response, next: NextFunction) => {
    getAlphaVantage(req.query).then((data) => {
      redisSet(req.originalUrl, data.data, 'days');
      res.json(data.data);
    }).catch((e) => {
      res.json(e)
    })
  }

  private init() {
    this.router.use('/', getCache, this.getData);
    this.router.use('/fundamental-data', getCache, this.getFundamentalData);
  }

}