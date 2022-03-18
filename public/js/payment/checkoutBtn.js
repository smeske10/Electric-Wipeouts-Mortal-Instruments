const checkoutBtn = document.querySelector("#checkout");

const checkout = async () => {
  const response = await fetch(`/checkout`, { method: "GET" });
  if (response.ok) {
    document.location.replace("/checkout");
  } else {
    alert("Failed to checkout");
  }
};

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", checkout);
}