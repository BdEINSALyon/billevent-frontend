import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Event from '../../billevent/Event'

@Component({
  selector: 'app-billetterie',
  templateUrl: './billetterie.component.html',
  styleUrls: ['./billetterie.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BilletterieComponent implements OnInit {

  event: Event;

  constructor() {
      this.event = new Event({
          id: 1,
          name: "Gala XXII - INSA Lyon",
          start_time: new Date(1518373800),
          end_time: new Date(1518404400),
          place: "La sucrière",
          address: "49-50 Quai Rambaud\n &nbsp; 69002 Lyon",
          website: "http://gala.bde-insa-lyon.fr",
          organizer: {
            name: "BdE INSA Lyon",
            address: "Thélème\n18 avenue des Arts\n69100 Villeurbanne",
            phone: "+33472434914",
            email: "contact@bde-insa-lyon.fr"
          }
      })
  }

  ngOnInit() {
  }

}
