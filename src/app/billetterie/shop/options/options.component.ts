import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Order from "../../../../billevent/Order";

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OptionsComponent implements OnInit {

    @Input()
    order: Order;

    constructor() {
    }

    ngOnInit() {
    }

}
