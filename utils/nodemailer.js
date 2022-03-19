"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

function nodeMail(user, products) {
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

  let attachmentsArr = [];

  function body(user, products) {
    let addedhtml = "";

    for (let i = 0; i < user.products.length; i++) {
      let attach = {};
      attach.filename = user.products[i].name;
      attach.path = user.products[i].image;
      attach.cid = user.products[i].name;
      attachmentsArr.push(attach);

      addedhtml += `<div class="row align-center mb-5">
      <div class="col-md-9">
        <img src="cid:${attach.cid}">
        <p> ${user.products[i].name}</p>
      </div>
      <div class="col-md-3">
        <p>$ ${user.products[i].price}</p>
      </div>    </div>`;
    }
    console.log(attachmentsArr);
    return addedhtml;
  }

  let message = {
    from: "electricwipeout@gmail.com",
    to: `${user.email}`,
    subject: "Thank You for Ordering from Electric Wipeout",
    attachments: { ...attachmentsArr },
    html: `<html lang="en">

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
        <h2> Welcome ${user.name}! Your Order has been Confirmed! </h2>
    </div>
    <br><br>
    </div>
    <div>
    <div class="row mt-4">
      <div class="col-auto text-center">
          <h3>A confirmation email has been sent to ${user.email}</h3>
      </div>
    </div>
    <br><br>
    ${body(user, products)}
    </main>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
  </body>
  <script src="../js/addToCart/cartBtn.js"></script>
  <script src="../js/payment/checkoutBtn.js"></script>
  <script src="../js/payment/submitBtn.js"></script>
  </html>`,
  };

  try {
    transport.sendMail(message, (error, info) => {
      if (error) {
        console.log(error);
        return process.exit(1);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = nodeMail;
