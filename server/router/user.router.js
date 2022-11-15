const router = require("express").Router();
const userController = require("./../controllers/user");
const authWare = require("./../middlewares/auth");

router.post("/register", userController.create);
router.post("/login", userController.login);
router.get("/me", authWare, userController.me);
router.get("/profile/:username", userController.profile);
router.post("/logout", authWare, userController.logout);
router.put("/profileupdate/:id", authWare, userController.profileUpdate);

module.exports = router;
