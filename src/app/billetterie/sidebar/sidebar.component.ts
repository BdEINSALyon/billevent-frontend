import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Event from '../../../billevent/Event';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SidebarComponent implements OnInit {

  @Input()
  event: Event;

  constructor() { }

  ngOnInit() {
  }

}
