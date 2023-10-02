const express = require("express");
const config = require("./config");
const mysql = require("mysql2");
const morgan = require("morgan");
const {pool} =require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes.js");

// Configuración
const TEST = "i";

const app = express();
app.use(cors({
  origin: "http://127.0.0.1:5173",
  credentials: true
}
));


const port = process.env.PORT || 9000;
app.set('port', port);

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(authRoutes);

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error conectando a MySQL: ' + err.stack);
    return;
  }
  console.log('Conectado a MySQL con ID de conexión ' + connection.threadId);
  // Realizar la consulta dentro de la conexión
  connection.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error('Error en la consulta: ' + err.message);
    } else {
      console.log("Resultado:", result);
    }
    // Liberar la conexión después de la consulta
    connection.release();
    // Exportar las variables después de que el pool esté listo
  });
});



// Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

// Escuchar en el puerto
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto " + port);
});
