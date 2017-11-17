import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
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
  url: SafeResourceUrl;

  constructor(public sanitizer:DomSanitizer) {
  }

  ngOnInit() {
  }

  joli(chaine: string) {
    if (chaine.charAt(0)!= '0'){
      return "0"+chaine;
    }else {
      return chaine;
    }
  }

  mapUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(
        "https://www.google.com/maps/embed/v1/place?key=AIzaSyAAHbywGkYMC2TUNDiDc7do8xqtyTclLD8&q=" + this.event.address
    );
  }

}
