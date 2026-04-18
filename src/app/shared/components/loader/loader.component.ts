import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="loader">Loading...</div>`,
  styles: [`.loader { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); }`]
})
export class LoaderComponent {}