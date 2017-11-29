import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BilleventApiService} from "../billevent-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Invitation} from "../../billevent/Invitation";

@Component({
    selector: 'app-invitation-token',
    templateUrl: './invitation-token.component.html',
    styleUrls: ['./invitation-token.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InvitationTokenComponent implements OnInit {

    token: string;
    state: string = "loading";
    invitation: Invitation;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private billeventApi: BilleventApiService) {
    }

    ngOnInit() {
        this.token = this.route.snapshot.paramMap.get('token');
        this.billeventApi.loginByToken(this.token).subscribe(
            (invitation) => {
                this.invitation = invitation;
                this.state = "success";
                this.router.navigate(['billetterie', invitation.event.id])
            },
            (err) => {
                console.error(err);
                setTimeout(() => {
                    this.state = "failed"
                }, 2500);
            }
        );
    }

}
