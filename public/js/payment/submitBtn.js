const submitBtn = document.querySelector("#submit");

const submit = async () => {
  const response = await fetch("/confirm", { method: "GET" });
  if (response.ok) {
    document.location.replace("/confirm");
  } else {
    alert("Failed to confirm");
  }
};

if (submitBtn) {
  submitBtn.addEventListener("click", submit);
}
