import { User } from '@generated/graphql';
import redis from 'redis';

export const redisClient = redis.createClient();

export const users: Array<User> = [
  {
    id: '1',
    name: 'Jaden'
  }, {
    id: '2',
    name: 'Lucas'
  }, {
    id: '3',
    name: 'Carson'
  }, {
    id: '4',
    name: 'TEST'
  }
];