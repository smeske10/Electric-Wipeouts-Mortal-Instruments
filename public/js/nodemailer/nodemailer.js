"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();
const { User } = require("../../../models");

async function nodeMail() {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  transport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  let message = {
    from: "Electric Wipeout <smeske10@gmail.com>",
    to: "<18klose@gmail.com>",
    subject: "Thank You for Ordering from Electric Wipeout" + Date.now(),
    text: "Hello! Thanks for ordering from Electric Wipeout Mortal instruments!",
    html: `<p><b>Hello!</b> Thanks for joining Electric Wipeout Mortal instruments! </p>`,
  };

  let send = transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred");
      console.log(error.message);
      return process.exit(1);
    }
  });

  console.log("Message sent: %s", send.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(send));
}

nodeMail();

module.exports = nodeMail();
