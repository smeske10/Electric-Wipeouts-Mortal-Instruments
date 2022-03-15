
'use strict';
const nodemailer = require("../../../lib/nodemailer");
// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
  if (err) {
      console.error('Failed to create a testing account');
      console.error(err);
      return process.exit(1);
  }

  console.log('Credentials obtained, sending message...');

  // NB! Store the account object values somewhere if you want
  // to re-use the same account for future mail deliveries

// Create a SMTP transporter object
let transporter = nodemailer.createTransport(
  {
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
          user: account.user,
          pass: account.pass
      },
      logger: true,
      transactionLog: true // include SMTP traffic in the logs
  },
  {
      // default message fields

      // sender info
      from: 'Nodemailer <example@nodemailer.com>',
      headers: {
          'X-Laziness-level': 1000 // just an example header, no need to use this
      }
  }
);

// Message object
let message = {
  // Comma separated list of recipients
  to: 'Nodemailer <example@nodemailer.com>',

  // Subject of the message
  subject: 'Nodemailer is unicode friendly ✔' + Date.now(),

  // plaintext body
  text: 'Hello! Thanks for joining Electric Wipeout Mortal instruments!',

  // HTML body
  html: `<p><b>Hello!</b> Thanks for joining Electric Wipeout Mortal instruments! </p>`,

  // AMP4EMAIL
  amp: `<!doctype html>
  <html ⚡4email>
    <head>
      <meta charset="utf-8">
      <style amp4email-boilerplate>body{visibility:hidden}</style>
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
    </head>
    <body>
      <p><b>Hello!</b> Thanks for joining Electric Wipeout Mortal instruments!</p>
    </body>
  </html>`,

  list: {
    // List-Help: <mailto:admin@example.com?subject=help>
    help: 'admin@example.com?subject=help',

    // List-Unsubscribe: <http://example.com> (Comment)
    unsubscribe: [
        {
            url: 'http://example.com/unsubscribe',
            comment: 'A short note about this url'
        },
        'unsubscribe@example.com'
    ],

    // List-ID: "comment" <example.com>
    id: {
        url: 'mylist.example.com',
        comment: 'This is my awesome list'
    }
}
};

transporter.sendMail(message, (error, info) => {
if (error) {
    console.log('Error occurred');
    console.log(error.message);
    return process.exit(1);
}

console.log('Message sent successfully!');
console.log(nodemailer.getTestMessageUrl(info));

// only needed when using pooled connections
transporter.close();
});
});


// async function main() {
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Electric Wipeout" <mortalinstruments@ew.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Thank you for creating an account with Electric Wipeout", // Subject line
//     text: "Thank you for creating an account with Electric Wipeout. We are proud to provide the sickest rock n' roll instruments in the world. By creating an account with us, you can add items to your cart and purchase them on the web page", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);

//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

// let transporter=
// nodemailer.createTransport(options[, 
//   defaults])

// //Sending mail
// transporter.sendMail(data[, callback])

// "use strict";
// const nodemailer = require("nodemailer");

// const nodeMailer = async function () {
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Electric Wipeout" <mortalinstruments@ew.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Thank you for creating an account with Electric Wipeout", // Subject line
//     text: "Thank you for creating an account with Electric Wipeout. We are proud to provide the sickest rock n' roll instruments in the world. By creating an account with us, you can add items to your cart and purchase them on the web page", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);

//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// };

// nodeMailer().catch(console.error);

