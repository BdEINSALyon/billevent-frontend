import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import localeFr from '@angular/common/locales/fr';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { JwtModule } from '@auth0/angular-jwt';
import {HelloWorldComponent} from './hello-world/hello-world.component';
import { BilletterieComponent } from './billetterie/billetterie.component';
import { SidebarComponent } from './billetterie/sidebar/sidebar.component';
import { SidebarEventComponent } from './billetterie/sidebar/event/event.component';
import { SidebarOrganizerComponent } from './billetterie/sidebar/organizer/organizer.component';
import { ShopComponent } from './billetterie/shop/shop.component';
import { CategoriesComponent } from './billetterie/shop/categories/categories.component';
import { ProductComponent } from './billetterie/shop/product/product.component';
import { QuestionsComponent } from './billetterie/shop/questions/questions.component';
import { PaymentComponent } from './billetterie/shop/payment/payment.component';
import { ConfirmationComponent } from './billetterie/shop/confirmation/confirmation.component';
import {HttpClientModule} from '@angular/common/http';
import {BilleventApiService} from "./billevent-api.service";
import {registerLocaleData} from "@angular/common";
import {FormsModule} from "@angular/forms";

registerLocaleData(localeFr);

const appRoutes: Routes = [
    {path: '', component: HelloWorldComponent, pathMatch: 'full'},
    {path: 'billetterie/:id', component: BilletterieComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        AppComponent,
        HelloWorldComponent,
        BilletterieComponent,
        SidebarComponent,
        SidebarEventComponent,
        SidebarOrganizerComponent,
        ShopComponent,
        CategoriesComponent,
        ProductComponent,
        QuestionsComponent,
        PaymentComponent,
        ConfirmationComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes
        ),
        BrowserModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem(BilleventApiService.TOKEN_STORAGE_KEY);
                },
                whitelistedDomains: BilleventApiService.domains,
                authScheme: 'JWT '
            }
        }),
        FormsModule
    ],
    providers: [
        BilleventApiService,
        {provide: LOCALE_ID, useValue: 'fr'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
