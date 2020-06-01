declare global {
  interface Window {
    lgData: any;
  }
}

export class UDLightboxApi {
  private closed: boolean = false;

  constructor(private el: Element) {
    this.onCloseAfter = this.onCloseAfter.bind(this);
    this.onAfterOpen = this.onAfterOpen.bind(this);
    el.addEventListener('onCloseAfter', this.onCloseAfter);
    el.addEventListener('onAfterOpen', this.onAfterOpen);
  }

  public destroy(destroyCompletely: boolean = true) {
    if (!this.closed) this.instance.destroy(destroyCompletely);
    this.el.removeEventListener('onCloseAfter', this.onCloseAfter);
    this.el.removeEventListener('onAfterOpen', this.onAfterOpen);
    this.el = null;
  }

  private onCloseAfter() {
    this.closed = true;
  }

  private onAfterOpen() {
    this.closed = false;
  }

  private get instance() {
    return window.lgData[this.el.getAttribute('lg-uid')];
  }
}
