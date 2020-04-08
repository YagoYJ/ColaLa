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

// Usuários:
router.post("/new-user", upload.single('profile'), UserController.create);

// Login:
router.post("/login", LoginController.create);

module.exports = router;
