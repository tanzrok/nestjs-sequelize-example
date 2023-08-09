export default () => ({
  database: {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'qwerty123',
    database: process.env.DATABASE_DATABASE || 'dev',
    logging: false,
  },
});
