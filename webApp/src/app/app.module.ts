import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloModule } from "angular2-apollo";
import { AppComponent } from './ui/container/app/app.component';
import { AwtListComponent } from './ui/components/awt-list/awt-list.component';
import { AwtFormComponent } from './ui/components/awt-form/awt-form.component';
import { AppStore, store } from "./store";
import { TestComponent } from './test/test.component';

const client = new ApolloClient();

export function storeFactory(){ return store };

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    AwtFormComponent,
    AwtListComponent,
    TestComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule.withClient(client)
  ],
  providers: [
    { provide: AppStore, useFactory: storeFactory }
    ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {}
