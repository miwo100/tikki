import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHomeComponent }  from './components/dashboard-home/dashboard-home.component';
import { TimetrackingComponent } from './components/timetracking';

const dashboardRoutes: Routes = [
  {
    path: 'home', 
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardHomeComponent
      },
      {
        path: 'timetracking',
        component: TimetrackingComponent
      }

    ]
   }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
