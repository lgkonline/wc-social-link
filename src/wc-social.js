const template = document.createElement('template');
template.innerHTML = `
<style>
  svg {
    width: 32px;
    height: 32px;
  }
</style>
<a><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512">
  <use />
</svg></a>
`;

export class WCSocial extends HTMLElement {

  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));
  };
  
  async connectedCallback() {
    this.network = (this.hasAttribute('network') ? this.getAttribute('network') : null);
    if(this.network) {
      this.setIcon();
    } else {
      throw Error(`WCSocial: 'network' attribue is require but missing`);
    }

    this.handle = (this.hasAttribute('handle') ? this.getAttribute('handle') : null);
    if(this.handle) {
      this.setLink();
    } else {
      throw Error(`WCSocial: 'handle' attribute is required but missing`);
    }    
  }

  setIcon() {
    let href = '../assets/';

    // lookup the svg url
    switch (this.network) {
      case 'github':
      case 'linkedin':
      case 'stackoverflow':
      case 'twitter':
        href += `${this.network}.svg#${this.network}`;
        break;
      default:
        throw Error(`WCSocial: network ${this.network} not supported`);
        return;
    }

    // set the icon
    const use = this.shadowRoot.querySelector('use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);
  }

  setLink() {
    let href;

    // look up the network profile url
    switch(this.network) {
      case 'github':
        href = `https://github.com/${this.handle}`;
        break;
      case 'linkedin':
        href = `https://linkedin.com/in/${this.handle}`;
        break;
      case 'stackoverflow':
        href = `https://stackoverflow.com/u/${this.handle}`;
        break;
      case 'twitter':
        href = `https://twitter.com/${this.handle}`;
    }

    // set the link
    const a = this.shadowRoot.querySelector('a');
    a.setAttribute('href', href);
  }

}

customElements.define('wc-social', WCSocial);