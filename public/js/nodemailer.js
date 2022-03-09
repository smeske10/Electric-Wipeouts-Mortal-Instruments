"use strict";
const nodemailer = require("nodemailer");

async function main() {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Electric Wipeout" <mortalinstruments@ew.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Thank you for creating an account with Electric Wipeout", // Subject line
    text: "Thank you for creating an account with Electric Wipeout. We are proud to provide the sickest rock n' roll instruments in the world. By creating an account with us, you can add items to your cart and purchase them on the web page", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
