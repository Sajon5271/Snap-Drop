import { Component } from '@angular/core';

@Component({
  selector: 'app-background',
  template: '<div class="background"><ng-content></ng-content></div>',
  styles: ['.background { background-image: url("./../../../assets/Moon.svg"); background-size: cover; position: fixed; top: 0; left: 0; right: 0; bottom: 0; }']
})
export class BackgroundComponent {
 //filter: blur(5px); z-index: -1; 
}
