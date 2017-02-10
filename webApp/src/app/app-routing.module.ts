import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './start/pages/landing-page/landing-page.component';
import { NotFoundPageComponent } from './start/pages/not-found-page/not-found-page.component';

const appRoutes: Routes = [
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
