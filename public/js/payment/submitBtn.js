const submitBtn = document.querySelector("#submit");

const submit = async () => {
  const response = await fetch(`/confirm`, {
    method: "GET",
  });
  if (response.ok) {
    console.log("is this working?");
    document.location.replace("/confirm");
  } else {
    alert("Failed to checkout");
  }
};

if (submitBtn) {
  submitBtn.addEventListener("click", submit);
}
