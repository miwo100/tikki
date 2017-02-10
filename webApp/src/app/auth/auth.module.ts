import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth.component';
import { User } from './models/user';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [],
  exports:[
    AuthComponent
    ]
})
export class AuthenticationModule { }
