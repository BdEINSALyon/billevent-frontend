import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {BilletOption, Participant} from "../../../../../billevent/Billet";
import Option from "../../../../../billevent/Option";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-select-option-count',
    templateUrl: './select-option-count.component.html',
    styleUrls: ['./select-option-count.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectOptionCountComponent implements OnInit {

    @Input()
    participant: Participant;

    @Input()
    option: Option;

    @Output()
    billet_option: EventEmitter<BilletOption> = new EventEmitter();

    _billet_option: BilletOption;

    selected = false;

    constructor() {
    }

    ngOnInit() {
        this._billet_option = new BilletOption();
        if(this.participant) {
            this._billet_option.billet = this.participant.billet;
            this._billet_option.participant = this.participant;
        }
        this._billet_option.option = this.option;
        this._billet_option.amount = 0;
        this.billet_option.emit(this._billet_option);
    }

    updateSingleCount($event: Event) {
        if ((<HTMLInputElement>($event.target)).checked) {
            this._billet_option.amount = 1;
        } else {
            this._billet_option.amount = 0;
        }
    }

    updateMultipleCount($event: Event) {
        this._billet_option.amount = parseInt((<HTMLInputElement>($event.target)).value);
    }

    selectIfSingle() {
        this.selected = !!!this.selected;
    }
}
