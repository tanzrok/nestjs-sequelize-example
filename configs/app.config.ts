export default () => ({
  app: {
    port: Number(process.env.PORT) || 8080,
    cors: process.env.CORS || '*',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
});
