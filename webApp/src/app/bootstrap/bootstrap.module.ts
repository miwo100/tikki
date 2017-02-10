import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapRoutingModule } from "./bootstrap-routing.module";
import { AuthenticationModule } from "../auth/auth.module";

import { RootComponent } from "./components/root/root.component";


@NgModule({
  imports: [
    CommonModule,
    BootstrapRoutingModule,
    AuthenticationModule
  ],
  declarations:[
    RootComponent
  ]
})
export class BootstrapModule { }
