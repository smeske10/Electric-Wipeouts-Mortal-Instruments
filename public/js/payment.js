const details = {
  id: "super-store-order-123-12312",
  displayItems: [
    {
      label: "Sub-total",
      amount: { currency: "GBP", value: "55.00" },
    },
    {
      label: "Value-Added Tax (VAT)",
      amount: { currency: "GBP", value: "5.00" },
    },
    {
      label: "Standard shipping",
      amount: { currency: "GBP", value: "5.00" },
    },
  ],
  total: {
    label: "Total due",
    // The total is GBP£65.00 here because we need to
    // add tax and shipping.
    amount: { currency: "GBP", value: "65.00" },
  },
};

const cardFee = {
  label: "Card processing fee",
  amount: { currency: "AUD", value: "3.00" },
};

// Modifiers apply when the user chooses to pay with
// a card.
const modifiers = [
  {
    additionalDisplayItems: [cardFee],
    supportedMethods: "https://example.com/cardpay",
    total: {
      label: "Total due",
      amount: { currency: "AUD", value: "68.00" },
    },
    data: {
      supportedNetworks: networks,
    },
  },
];

Object.assign(details, { modifiers });

async function doPaymentRequest() {
  try {
    const request = new PaymentRequest(methodData, details, options);
    const response = await request.show();
    await validateResponse(response);
  } catch (err) {
    // AbortError, SecurityError
    console.error(err);
  }
}
async function validateResponse(response) {
  try {
    const errors = await checkAllValuesAreGood(response);
    if (errors.length) {
      await response.retry(errors);
      return validateResponse(response);
    }
    await response.complete("success");
  } catch (err) {
    // Something went wrong...
    await response.complete("fail");
  }
}

async function doPaymentRequest() {
  const payRequest = new PaymentRequest(methodData, details, options);
  const payResponse = await payRequest.show();
  let result = "";
  try {
    const httpResponse = await fetch("/process-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payResponse.toJSON(),
    });
    result = httpResponse.ok ? "success" : "fail";
  } catch (err) {
    console.error(err);
    result = "fail";
  }
  await payResponse.complete(result);
}

doPaymentRequest();
