const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const upload = multer({storage: storage});

const UserController = require("../controllers/UserController");
const LoginController = require("../controllers/LoginController");
const ForgotPasswordController = require("../controllers/ForgotPasswordController");
const ResetPasswordController = require("../controllers/ResetPasswordController");

// Usuários:
router.post("/new-user", upload.single('profile'), UserController.create);

// Login:
router.post("/login", LoginController.create);

// Esqueci minha senha:
router.post("/forgot-password", ForgotPasswordController.create);

// Reset da senha:
router.post("/reset-password", ResetPasswordController.create);

module.exports = router;
