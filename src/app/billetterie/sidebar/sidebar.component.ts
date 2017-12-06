import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Event from '../../../billevent/Event';
import {Invitation} from "../../../billevent/Invitation";
import {ShopManagerService} from "../shop-manager.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SidebarComponent implements OnInit {

  @Input()
  event: Event;

  invitation: Invitation;

  constructor(private shopManager: ShopManagerService) { }

  ngOnInit() {
    this.shopManager.getInvitation(this.event).subscribe(
        (invitation) => {
          this.invitation = invitation;
        }
    )
  }

}
