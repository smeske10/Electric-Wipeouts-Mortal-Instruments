import View from "view";

export default class ConfirmationView extends View {
  constructor(containerId = "confirmation") {
    super(containerId);
    this._requestData = "";
    this._responseData = "";
    this._requestDiv = document.getElementById("requestData");
    this._responseDiv = document.getElementById("responseData");
    // this._clickHandler = null;
    // this._checkoutBtn = document.getElementById('checkoutBtn');
  }

  install() {
    // this._clickHandler = this._handleClick.bind(this);
    // this._container.addEventListener('click', this._clickHandler, true);
  }

  render() {
    this._requestDiv.innerText = this._requestData;
    this._responseDiv.innerText = this._responseData;
  }

  set requestData(value) {
    this._requestData = value === null ? "" : value;
    this._render();
  }

  set responseData(value) {
    this._responseData = value === null ? "" : value;
    this._render();
  }
}
