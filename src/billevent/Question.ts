
const questions = {};

export default class Question {

  id: number;
  question: string;
  help_text: string;
  question_type: number;
  required = false;
    target: string;
    data: any;

    constructor(question) {
        if (questions.hasOwnProperty(question.id.toString())) {
            return questions[question.id];
        } else {
            this.id = question.id;
            this.question = question.question;
            this.help_text = question.help_text;
            this.data = question.data && question.data.length > 0 ? JSON.parse(question.data) : [];
            this.question_type = parseInt(question.question_type);
            this.required = question.required;
            this.target = question.target;
            questions[question.id] = this;
        }
    }

}
