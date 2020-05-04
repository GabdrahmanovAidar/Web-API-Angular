export const env = {
  isProd: process.env.NODE_ENV === 'production' || false,
  isDev: process.env.NODE_ENV === 'development' || false,
  isTest: process.env.NODE_ENV === 'test' || false,
  toString() { return process.env.NODE_ENV }
};
