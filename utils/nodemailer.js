"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

async function nodeMail(user, products) {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USERNAME,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      accessToken: process.env.OAUTH_ACCESS_TOKEN,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  setTimeout(() => {
    let message = {
      from: "electricwipeout@gmail.com",
      to: "18bklose.stem@gmail.com",
      subject: "Thank You for Ordering from Electric Wipeout",
      html: `
  <html lang="en">

  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MI homepage</title>
    <link rel="stylesheet" type="text/css" href="/css/jass.css" />
    <link rel="stylesheet" type="text/css" href="/css/style.css" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
  </head>

  <body>
    <header>
      <h1>Welcome to Mortal Instruments!</h1>
      <h3>Where music dreams come true</h3>
    </header>
    <main class="container container-fluid mt-5">
    <div class="row">
    <div class="col-auto">
        <h2> Welcome {{name}}! Your Order has been Confirmed! </h2>
    </div>
    <br><br>
    </div>
    <div>
    <div class="row mt-4">
      <div class="col-auto text-center">
          <h3>A confirmation email has been sent to {{email}}</h3>
      </div>
    </div>
    <br><br>
    {{#each products as |product| }}
    <div class="row align-center mb-5">
      <div class="col-md-3">
        <p>$ {{price}}</p>
    </div>
    <div class="col-md-9">
          <p>{{name}}</p>
    </div>
    </div>
    {{/each}}
    </main>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
    {{#if logged_in}}
      <script src="../js/login/logout.js"></script>
    {{/if}}
  </body>
  <script src="../js/addToCart/cartBtn.js"></script>
  <script src="../js/payment/checkoutBtn.js"></script>
  <script src="../js/payment/submitBtn.js"></script>
  </html>`,
    };
    try {
      transport.sendMail(message, (error, info) => {
        if (error) {
          console.log("Error occurred");
          console.log(error);
          return process.exit(1);
        }
      });
    } catch (err) {
      console.log(err);
      console.log("send");
    }
  }, 1000);
}

module.exports = nodeMail;
