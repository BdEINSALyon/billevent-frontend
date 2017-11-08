import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HelloWorldComponent} from './hello-world/hello-world.component';


const appRoutes: Routes = [
    {path: '', component: HelloWorldComponent, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        AppComponent,
        HelloWorldComponent
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
