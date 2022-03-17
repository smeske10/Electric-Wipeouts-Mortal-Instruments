<<<<<<< HEAD
// import nodeMail from "../nodemailer/nodemailer";
// import PaymentAPIWrapper from "./payment-api";

// const checkoutBtn = document.querySelector("#checkout");

// const checkout = async (event) => {
//   const response = await fetch(`/checkout`, {
//     method: "GET",
//   });
//   if (response.ok) {
//     const payment = new PaymentAPIWrapper();
//   } else {
//     alert("Failed to checkout");
//   }
//   if (payment) {
//     nodeMail;
//   }
// };
=======
const checkoutBtn = document.querySelector("#checkout");

const checkout = async () => {
  const response = await fetch(`/checkout`, { method: "GET" });
  if (response.ok) {
    document.location.replace("/checkout");
    // const payment = new PaymentAPIWrapper();
  } else {
    alert("Failed to checkout");
  }
};
>>>>>>> b27bb0875a64e76692d004dd525da0cd4796cdaa

// if (checkoutBtn) {
//   checkoutBtn.addEventListener("click", checkout);
// }
