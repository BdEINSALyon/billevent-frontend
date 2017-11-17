import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Order from "../../../../billevent/Order";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationComponent implements OnInit {

  @Input()
  order: Order;

  constructor() {
  }

  ngOnInit() {
    if(this.order.state < 2){

    } else if(this.order.state > 2) {
      throw new Error('Invalid state!')
    }
  }

}
