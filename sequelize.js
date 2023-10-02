const { Sequelize } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost',
  username: 'root',
  password: 'foo',
  database: 'test2',
  port: 33061
});

// Prueba la conexión a la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con la base de datos sequelize');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

module.exports = sequelize;
