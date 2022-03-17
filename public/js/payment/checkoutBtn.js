import nodeMail from "../nodemailer/nodemailer";
import PaymentAPIWrapper from "./payment-api";

const checkoutBtn = document.querySelector("#checkout");

const checkout = async (event) => {
  const response = await fetch(`/checkout`, {
    method: "GET",
  });
  if (response.ok) {
    const payment = new PaymentAPIWrapper();
  } else {
    alert("Failed to checkout");
  }
  if (payment) {
    nodeMail;
  }
};

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", checkout);
}
