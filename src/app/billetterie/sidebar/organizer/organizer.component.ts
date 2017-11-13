import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Organizer from "../../../../billevent/Organizer";

@Component({
  selector: 'sidebar-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarOrganizerComponent implements OnInit {

    @Input()
    organizer: Organizer;

  constructor() { }

  ngOnInit() {
  }

}
