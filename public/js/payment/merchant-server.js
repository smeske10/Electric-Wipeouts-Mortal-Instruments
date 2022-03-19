const sendToServer = async (body) => {
  return fetch("/payment", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  }).then((res) => {
    if (res.status !== 200) {
      throw error(`Payment failure (id ${res.status})`);
    }
    return true;
  });
};

module.exports = sendToServer;
