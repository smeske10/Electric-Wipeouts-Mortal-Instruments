function sendToServer(data) {
  return fetch("/checkout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status !== 200) {
      throw error(`Payment failure (id ${res.status})`);
    }
    return true;
  });
}
