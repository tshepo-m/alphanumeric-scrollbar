/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface ScrollbarComponent {
    'height': number;
    'initHeight': boolean;
    'letterList': any;
  }
  interface ScrollbarComponentAttributes extends StencilHTMLAttributes {
    'height'?: number;
    'initHeight'?: boolean;
    'letterList'?: any;
  }
}

declare global {
  interface StencilElementInterfaces {
    'ScrollbarComponent': Components.ScrollbarComponent;
  }

  interface StencilIntrinsicElements {
    'scrollbar-component': Components.ScrollbarComponentAttributes;
  }


  interface HTMLScrollbarComponentElement extends Components.ScrollbarComponent, HTMLStencilElement {}
  var HTMLScrollbarComponentElement: {
    prototype: HTMLScrollbarComponentElement;
    new (): HTMLScrollbarComponentElement;
  };

  interface HTMLElementTagNameMap {
    'scrollbar-component': HTMLScrollbarComponentElement
  }

  interface ElementTagNameMap {
    'scrollbar-component': HTMLScrollbarComponentElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
