export default class View {
  constructor(containerId, renderBeforeVisible = false) {
    this._containerId = containerId;
    this._container = document.getElementById(this._containerId);
    this._needsRender = renderBeforeVisible;
  }

  render() {
    // override
  }

  set visible(vis) {
    if (vis && !this.visible && this._needsRender) {
      // becoming visible, update
      this.render();
    }
    if (vis) {
      this._container.removeAttribute("hidden");
    } else {
      this._container.setAttribute("hidden", true);
    }
  }

  get visible() {
    return !this._container.hasAttribute("hidden");
  }
}
