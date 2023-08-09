module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'qwerty123',
    database: 'dev',
    logging: false,
  },
  production: {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    logging: false,
  },
};
