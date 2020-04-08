const nodemailer = require("nodemailer");
const { host, port, user, pass } = require("../config/mail.json");
const mailerHandlebars = require("nodemailer-express-handlebars");
const path = require("path");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

transport.use(
  "compile",
  mailerHandlebars({
    viewEngine: {
      extName: ".html",
      partialsDir: path.resolve("./resources/mail/"),
      layoutsDir: path.resolve("./resources/mail/"),
      defaultLayout: "auth/forgotPassword.html",
    },
    viewPath: path.resolve("./resources/mail/"),
    extName: ".html",
  })
);

module.exports = transport;
