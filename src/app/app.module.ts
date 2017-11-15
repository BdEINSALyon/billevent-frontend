import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { JwtModule } from '@auth0/angular-jwt';
import {HelloWorldComponent} from './hello-world/hello-world.component';
import { BilletterieComponent } from './billetterie/billetterie.component';
import { SidebarComponent } from './billetterie/sidebar/sidebar.component';
import { SidebarEventComponent } from './billetterie/sidebar/event/event.component';
import { SidebarOrganizerComponent } from './billetterie/sidebar/organizer/organizer.component';
import { ShopComponent } from './billetterie/shop/shop.component';
import { CategoryComponent } from './billetterie/shop/category/category.component';
import { ProductComponent } from './billetterie/shop/product/product.component';
import { QuestionsComponent } from './billetterie/shop/questions/questions.component';
import { PaymentComponent } from './billetterie/shop/payment/payment.component';
import { ConfirmationComponent } from './billetterie/shop/confirmation/confirmation.component';
import {HttpClientModule} from '@angular/common/http';
import {BilleventApiService} from "./billevent-api.service";


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
        CategoryComponent,
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
        })
    ],
    providers: [
        BilleventApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
