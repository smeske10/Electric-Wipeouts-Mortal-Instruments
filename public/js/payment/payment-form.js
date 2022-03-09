import View from "view";
import sendToServer from "merchant-server";

export default class PaymentForm extends View {
  constructor(cart, confirmationView, containerId = "payment") {
    super(containerId);
    this._checkoutForm = document.getElementById("payment_form");
    this._cart = cart;
    this._confirmationView = confirmationView;
    this._promise = null;
  }

  checkout() {
    // TODO how do we handle cart abandonment?
    var self = this;
    this.visible = true;
    this._promise = new Promise((resolve, reject) => {
      this._checkoutForm.addEventListener("submit", function temp(event) {
        event.preventDefault();
        var data = new FormData(event.target);
        self._showRequest(data);
        return Promise.resolve(data)
          .then(sendToServer)
          .then((json) => {
            self._showResponse(json);
            resolve(json);
          })
          .catch((e) => reject(e))
          .then(() => self._checkoutForm.removeEventListener("submit", temp));
      });
    });
    return this._promise;
  }

  abort() {
    this._promise.reject("aborted");
  }

  _showRequest(formData) {
    if (this._confirmationView) {
      this._confirmationView.requestData = this._toJSON(formData);
    }
  }

  _showResponse(json) {
    if (this._confirmationView) {
      this._confirmationView.responseData = json;
    }
  }

  _toJSON(formData) {
    let obj = {};
    for (let entry of formData) {
      obj[entry.key] = entry.value;
    }
    return JSON.stringify(obj);
  }
}
