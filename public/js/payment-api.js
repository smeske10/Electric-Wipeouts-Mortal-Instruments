import sendToServer from "merchant-server";

const SHIPPING_OPTIONS = {
  us: [
    {
      id: "standard",
      label: "Standard Shipping",
      price: 0,
    },
    {
      id: "express",
      label: "Express Shipping",
      price: 10,
    },
  ],
  international: [
    {
      id: "international",
      label: "International Shipping",
      price: 15,
    },
  ],
};

export default class PaymentAPIWrapper {
  checkout(cart) {
    let request = this.buildPaymentRequest(cart);
    let response;
    // Show UI then continue with user payment info

    return request
      .show()
      .then((r) => {
        response = r;
        let data = r.toJSON();
        console.log(data);
        return data;
      })
      .then((data) => {
        return sendToServer(data);
      })
      .then(() => {
        response.complete("success");
        return response;
      })
      .catch((e) => {
        if (response) {
          console.error(e);
          response.complete("fail");
        } else if (e.code !== e.ABORT_ERR) {
          console.error(e);
          throw e;
        } else {
          return null;
        }
      });
  }

  buildPaymentRequest(cart) {
    const supportedInstruments = [
      {
        supportedMethods: ["basic-card"],
        data: {
          supportedNetworks: ["visa", "mastercard", "amex", "discover"],
        },
      },
    ];

    // Payment options
    const paymentOptions = {
      requestShipping: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
      requestPayerName: true,
    };

    let shippingOptions = [];
    let selectedOption = null;

    let details = this.buildPaymentDetails(
      cart,
      shippingOptions,
      selectedOption
    );

    let request = new PaymentRequest(
      supportedInstruments,
      details,
      paymentOptions
    );

    // When user selects a shipping address, add shipping options to match
    request.addEventListener("shippingaddresschange", (e) => {
      e.updateWith(
        ((_) => {
          // Get the shipping options and select the least expensive
          shippingOptions = this.optionsForCountry(
            request.shippingAddress.country
          );
          selectedOption = shippingOptions[0].id;
          let details = this.buildPaymentDetails(
            cart,
            shippingOptions,
            selectedOption
          );
          return Promise.resolve(details);
        })()
      );
    });

    // When user selects a shipping option, update cost, etc. to match
    request.addEventListener("shippingoptionchange", (e) => {
      e.updateWith(
        ((_) => {
          selectedOption = request.shippingOption;
          let details = this.buildPaymentDetails(
            cart,
            shippingOptions,
            selectedOption
          );
          return Promise.resolve(details);
        })()
      );
    });

    return request;
  }

  buildPaymentDetails(cart, shippingOptions, shippingOptionId) {
    let displayItems = cart.cart.map((item) => {
      return {
        label: `${item.sku}: ${item.quantity}x $${item.price}`,
        amount: { currency: "USD", value: String(item.total) },
      };
    });

    let total = cart.total;

    let displayedShippingOptions = [];
    if (shippingOptions.length > 0) {
      let selectedOption = shippingOptions.find((option) => {
        return option.id === shippingOptionId;
      });
      displayedShippingOptions = shippingOptions.map((option) => {
        return {
          id: option.id,
          label: option.label,
          amount: { currency: "USD", value: String(option.price) },
          selected: option.id === shippingOptionId,
        };
      });
      if (selectedOption) total += selectedOption.price;
    }

    let details = {
      displayItems: displayItems,
      total: {
        label: "Total due",
        amount: { currency: "USD", value: String(total) },
      },
      shippingOptions: displayedShippingOptions,
    };

    return details;
  }

  /*
   * Utility function to extract the correct shipping options for a country.
   */
  optionsForCountry(country) {
    country = country.toLowerCase();
    if (!country || !SHIPPING_OPTIONS.hasOwnProperty(country)) {
      country = "international";
    }
    let options = SHIPPING_OPTIONS[country];
    // Sort by price, lowest first
    options.sort((a, b) => {
      return a.price - b.price;
    });
    return options;
  }
}
