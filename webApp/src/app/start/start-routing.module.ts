import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const startRoutes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'notfound', component: NotFoundPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(startRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StartRoutingModule { }
