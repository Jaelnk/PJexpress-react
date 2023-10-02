// knexfile.js
module.exports = {
    client: 'mysql', 
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'foo',
        database: 'test2',
        port: 33061
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations'
    }
  };
  