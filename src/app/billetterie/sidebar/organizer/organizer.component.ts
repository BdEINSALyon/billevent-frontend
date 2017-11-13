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

  toPhone (phone: string) {
      if (phone.charAt(0)==='+'&&phone.charAt(1)==='3'&&phone.charAt(2)==='3'){
          var newphone: string;
          newphone = '0'+phone.charAt(3)+' ';
          for (var i=4; i<11;i=i+2){
              newphone= newphone + phone.charAt(i)+phone.charAt(i+1)+' ';
          }
          return newphone;
      }else {
          return phone;
      }
  }

}
