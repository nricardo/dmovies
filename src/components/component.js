import {Inject} from 'angular2-now';

@Inject(['$element'])
export class dmComponent
{
    constructor ($element) {
      /*
      let content = $element.html();
      let shadow = $element[0].createShadowRoot();

      $element.html('');
      shadow.innerHTML = content;
      */

      // apply to all nodes a property to fake ShadomDOM
      this.fakeShadowCSS($element[0], $element[0].localName);
    }

    fakeShadowCSS (element, name) {
      let nodes = element.children;
      element.setAttribute(name, '');
      console.log(nodes)
      for (let i=nodes.length; i--;) this.fakeShadowCSS(nodes[i], name);
    }
}
