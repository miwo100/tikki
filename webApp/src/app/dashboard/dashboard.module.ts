import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AwtListComponent, AwtFormComponent, TimetrackingComponent } from './components/timetracking';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    AwtListComponent,
    AwtFormComponent,
    TimetrackingComponent
  ]
})
export class DashboardModule { }
