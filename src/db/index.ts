import { User } from '@generated/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const redisOptions: Redis.RedisOptions = {
  retryStrategy: (options) => {
    return Math.min(options * 100, 3000);
  },
}


export const pubsub = new RedisPubSub({
  publisher: new Redis(undefined, undefined, redisOptions),
  subscriber: new Redis(undefined, undefined, redisOptions),
});

export const redisClient = new Redis(redisOptions);

export const NEW_MESSAGE = 'NEW_MESSAGE' as const;

redisClient.hset('user:1', 'name', 'Jaden');
redisClient.hset('user:2', 'name', 'Lucas');
redisClient.hset('user:3', 'name', 'Carson');
redisClient.hset('user:4', 'name', 'Ted');