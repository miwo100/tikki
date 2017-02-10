import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloModule } from "angular2-apollo";
import { AppStore, storeFactory } from "./store";
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { StartModule } from './start/start.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RootComponent } from './bootstrap/components/root/root.component';
import { AuthenticationService } from "./auth/services/authentication.service";
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  // Components, Pipes, Directive
  // Entry Components
  entryComponents: [
    RootComponent
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule.withClient(new ApolloClient()),
    BootstrapModule,
    DashboardModule,
    StartModule,
    AppRoutingModule
  ],
  providers: [
    { provide: AppStore, useFactory: storeFactory },
    AuthenticationService
    ],
  // Main Component
  bootstrap: [ RootComponent ]
})
export class AppModule {}

