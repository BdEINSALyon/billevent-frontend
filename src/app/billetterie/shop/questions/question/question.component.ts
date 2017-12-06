import {Component, EventEmitter, OnInit, Output, Input, ViewEncapsulation} from '@angular/core';
import Question from "../../../../../billevent/Question";
import Answer from "../../../../../billevent/Answer";
import {default as Billet, Participant} from "../../../../../billevent/Billet";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionComponent implements OnInit {

    @Input()
    question: Question;

    @Input()
    participant: Participant;

    @Input()
    billet: Billet;

    @Input()
    id: string = "noid";

    @Output()
    answer: EventEmitter<Answer> = new EventEmitter();

    _answer: Answer;

    constructor() {
    }

    ngOnInit() {
        console.log(this.question);
        this._answer = new Answer(this.question);
        if(this.participant)
            this._answer.participant = this.participant;
        if(this.billet)
            this._answer.billet = this.billet;
        this.answer.emit(this._answer);
    }

    update(event: any) {
        this._answer.update(event.target.value);
        this.answer.emit(this._answer);
    }

}
