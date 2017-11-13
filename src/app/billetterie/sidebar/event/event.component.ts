import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Event from '../../../../billevent/Event';

@Component({
  selector: 'sidebar-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarEventComponent implements OnInit {

  @Input()
  event: Event;

  constructor() { }

  ngOnInit() {
  }

  joli(chaine: string) {
    if (chaine.charAt(0)!= '0'){
      return "0"+chaine;
    }else {
      return chaine;
    }
  }

}
