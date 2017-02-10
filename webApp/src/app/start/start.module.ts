import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { StartRoutingModule } from './start-routing.module';


@NgModule({
    imports: [
        CommonModule,
        StartRoutingModule
    ],
    declarations: [
        LandingPageComponent,
        NotFoundPageComponent]
})
export class StartModule { }