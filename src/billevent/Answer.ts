

import Question from "./Question";
import {default as Billet, Participant} from "./Billet";

export default class Answer{

    question: Question;
    participant: Participant;
    billet: Billet;
    value: any;

    constructor(question: Question){
        this.question = question;
    }

    update(value){
        this.value = value;
    }

    toJSON(){
        return {
            question: this.question.id,
            value: this.value,
            participant: this.participant ? this.participant.id : null,
            billet: this.billet ? this.billet.id : null,
        }
    }

}