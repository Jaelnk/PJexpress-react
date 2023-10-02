const { pool } = require("../db");
const sequelize = require('../../sequelize');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js");
const { createAccessToken } = require("../libs/jwt.js");

// Sincroniza el modelo con la base de datos
sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
  }).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

            // Verifica si el correo electrónico ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({
            respuesta: "error",
            mensaje: "El correo electrónico ya está registrado. Por favor, elige otro.",
        });
        }

        // Utiliza el método hash de bcrypt para cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 5); // Ajusta el número de rondas según tus necesidades
        // Insertar un nuevo usuario en la base de datos
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword, // Almacena la contraseña cifrada en la base de datos
        });

        // create access token
        const token = await createAccessToken({
            id: newUser.id,
        });
        res.cookie("token", token, 
        {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        }
        );

        res.json({ 
            token: token,
            user: newUser
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        respuesta: "error",
        mensaje: "Error al cargar usuario"
      });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userFound = await User.findOne({ where: { email } });
        
      if (!userFound)
        return res.status(400).json({
          message: ["The email does not exist"],
        });
        console.log(req.body,"->",userFound);
  
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(400).json({
          message: ["The password is incorrect"],
        });
      }
      const token = await createAccessToken({
        id: userFound.id,
        username: userFound.username,
      });

      //res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

      res.cookie("token", token, 
      {
        httpOnly: true,
        secure: true, // Agrega esta línea para establecer el atributo "Secure"
        sameSite: "none",
      }  );


      console.log("Request Body:", req);
      res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };







  exports.index = async (req, res) => {
    try {

        const { token } = req.cookies;
        if (!token) return res.json({ message: "No token, authorization denied" });

        jwt.verify(token, TOKEN_SECRET, async (error, user) => {
            if (error) return res.sendStatus(401).json({ message: "Token is not valid" });;

        /*  const userFound = await User.findById(user.id);
            if (!userFound) return res.sendStatus(401).json({ message: "user not found" });; */

            pool.getConnection((err, connection) => {
                connection.query("SELECT * FROM users", (err, result) => {connection.release();
                res.json({
                  respuesta: 'ok',
                  users: result
                });
              });
            });

        });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        respuesta: "error",
        mensaje: "Error al obtener usuarios."
      });
    }
  };


  exports.verifyToken = async (req, res) => {
    try {
      const { token } = req.cookies;
      if (!token) return res.send(false);
  
      const decoded = jwt.verify(token, TOKEN_SECRET);
      const userFound = await User.findOne({ where: { id: decoded.id } });
  
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        cookies: req.cookies
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(401);
    }
  };
  

  exports.logout = async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    return res.sendStatus(200);
  };