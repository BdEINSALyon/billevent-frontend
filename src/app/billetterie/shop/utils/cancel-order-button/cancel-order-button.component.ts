import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Order from "../../../../../billevent/Order";
import {ShopManagerService} from "../../../shop-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cancel-order-button',
  templateUrl: './cancel-order-button.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CancelOrderButtonComponent implements OnInit {

  @Input()
  order: Order;

  constructor(
      private shopManagerService: ShopManagerService,
      private router: Router) { }

  ngOnInit() {
  }

  click(){
    if(confirm("Voulez-vous annuler cette commande ?"))
      this.shopManagerService.cancelOrder(this.order).subscribe(() => {
        window.location.reload(true);
      })
  }

}
