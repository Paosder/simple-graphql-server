const defaultPort = 4000;
const defaultIP = '0.0.0.0';

interface Environment {
  apollo: {
    introspection: boolean,
    playground: boolean
  },
  port: number|string;
  binding: string;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true'
  },
  port: process.env.PORT || defaultPort,
  binding: process.env.IP || defaultIP,
};