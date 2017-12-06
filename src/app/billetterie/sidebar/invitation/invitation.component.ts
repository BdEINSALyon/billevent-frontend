import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Invitation} from "../../../../billevent/Invitation";

@Component({
  selector: 'app-sidebar-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvitationComponent implements OnInit {

  @Input() invitation: Invitation;

  constructor() { }

  ngOnInit() {
  }

}
