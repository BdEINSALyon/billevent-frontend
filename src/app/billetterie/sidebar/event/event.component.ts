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

}
