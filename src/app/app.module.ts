import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HelloWorldComponent} from './hello-world/hello-world.component';
import { BilletterieComponent } from './billetterie/billetterie.component';


const appRoutes: Routes = [
    {path: '', component: HelloWorldComponent, pathMatch: 'full'},
    {path: 'billetterie/:id', component: BilletterieComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        AppComponent,
        HelloWorldComponent,
        BilletterieComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        ),
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
