import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ShopManagerService} from "../../shop-manager.service";
import Order from "../../../../billevent/Order";
import Billet, {Participant} from "../../../../billevent/Billet";
import Question from "../../../../billevent/Question";
import {NgForm} from "@angular/forms";
import Answer from "../../../../billevent/Answer";

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionsComponent implements OnInit {

    @Input()
    order: Order;

    ngForm: NgForm;

    participantSaved = false;

    orderQuestions: Set<Question> = new Set();
    answers: Set<Answer> = new Set();

    constructor(private shopManager: ShopManagerService) {
    }

    ngOnInit() {
        this.order.billets.forEach((billet) => {
            billet.product.questions.forEach((question) => {
                if(question.target === "Order") this.orderQuestions.add(question);
            })
        });

    }

    participants(billet: Billet) {
        for(let i = billet.participants.length; i < billet.product.seats; i++) {
            billet.participants.push(new Participant(billet));
        }
        return billet.participants;
    }

    updateAnswer(answer: Answer) {
        if(!this.answers.has(answer))
            this.answers.add(answer);
    }

    hasOrderQuestions() {
        return this.orderQuestions.size > 0;
    }

    validateQuestions() {
        console.log(this.ngForm);

    }
    onSubmit(f: NgForm) {
        if(!f.valid) {
            alert("Tous les champs requis n'ont pas été remplis");
            return;
        }
        if(!this.participantSaved)
            this.shopManager.saveParticipants(this.order).subscribe(
                () => {this.participantSaved = true; this.saveQuestions()},
                () => {alert("Les informations des participants ne sont pas valides")},
            );
        else
            this.saveQuestions();
        console.log(f.form)
    }

    private saveQuestions() {
        this.shopManager.saveAnswers(this.order, this.answers).subscribe(
            () => {},
            () => {
                alert("Certaines questions n'ont pas de réponse")
            }
        );
    }
}
