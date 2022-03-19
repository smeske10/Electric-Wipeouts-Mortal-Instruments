let validationName = document.querySelector("#validationName");
let validationEmail = document.querySelector("#validationEmail");
let validationAddress = document.querySelector("#validationAddress");
let inputAddress2 = document.querySelector("#inputAddress2");
let validationCity = document.querySelector("#validationCity");
let validationState = document.querySelector("#validationState");
let inputZip = document.querySelector("#inputZip");
let inputShip = document.querySelector("#inputShip");
let cardNum = document.querySelector("#cardNum");
let inputDate = document.querySelector("#inputDate");
let inputYear = document.querySelector("#inputYear");
let inputCvc = document.querySelector("#inputCvc");

let body = {
  name: validationName.value,
  email: validationEmail.value,
  address: validationAddress.value,
  address2: inputAddress2.value,
  city: validationCity.value,
  state: validationState.value,
  zip: inputZip.value,
  shipping: inputShip.value,
  card: cardNum.value,
  expMonth: inputDate.value,
  expYear: inputYear.value,
  cvc: inputCvc.value,
};

function send() {
  body.json();
}

module.exports = send;
