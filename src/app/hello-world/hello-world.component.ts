import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  template: `
    <p>
      hello-world works!
    </p>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class HelloWorldComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
