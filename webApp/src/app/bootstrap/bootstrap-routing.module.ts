import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from '../start/pages/landing-page/landing-page.component';

const bootstrapRoutes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(bootstrapRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapRoutingModule { }




