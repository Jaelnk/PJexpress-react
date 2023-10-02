const express = require("express");
const {
  login,
  logout,
//  register,
  verifyToken,
  index,
  register
//  loadPantallasAndAccesos,
//  viewRoutes
} = require("../controllers/controllers.js");
//const { validateSchema } = require("../middlewares/validator.middleware.js");
//const { loginSchema, registerSchema } = require("../schemas/auth.schema.js");

const router = express.Router();

router.get("/index", index);

router.post("/register", register);

router.post("/login", login);
router.get("/verify", verifyToken);

router.get("/logout", logout);

/* router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);

//router.post("/register", register);

router.get("/index", index);
//router.get("/cargarpantallas", loadPantallasAndAccesos);


router.get("/registryRoutes", viewRoutes);
router.get("/verify", verifyToken);
router.get("/logout", logout);
 */
module.exports = router;
