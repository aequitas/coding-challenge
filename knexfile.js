module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db.sqlite',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: 'db',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
    },
  },
};
