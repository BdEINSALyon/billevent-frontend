import { Pipe, PipeTransform } from '@angular/core';
import Question from "../../../../billevent/Question";

@Pipe({
  name: 'questionTarget'
})
export class QuestionTargetPipe implements PipeTransform {

  transform(value: Question[], target:string): any {
    return value.filter((question) => question.target === target);
  }

}
