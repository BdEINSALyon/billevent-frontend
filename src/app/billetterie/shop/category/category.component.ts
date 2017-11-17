import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import Category from '../../../../billevent/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {

  @Input()
  category: Category;
  categories: String[];
  lenght: number;

  constructor() {
    this.categories=["Pack Soirée", "Pack Nuitée", "Pack Week-End"];
    this.lenght=this.categories.length;
  }

  ngOnInit() {
    console.log(this.categories);
  }

  checkAmount(product){
    console.log("46546")
  }

}
