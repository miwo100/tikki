import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { User } from "../models/user";

const LOGIN_MESSAGE: string = "Connect to Github";
const LOGOUT_MESSAGE: string = "Logout";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  pictureUrl: string = "";
  loginButtonCaption: string = LOGIN_MESSAGE;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService) {
    this.authService.userIsloggedIn.subscribe((loggedIn: boolean) => {
      if(loggedIn){
        this.pictureUrl = authService.currentUser.pictureUrl;
        this.loginButtonCaption = LOGOUT_MESSAGE;
      }
      else
      {
        this.pictureUrl = "";
        this.loginButtonCaption = LOGIN_MESSAGE
      }
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (qp) => {
        if (qp["access_token"]) {
          let user: User = {
            userName: qp["user_name"],
            pictureUrl: qp["profile_picture"],
            accessToken: qp["access_token"]
          }
          this.authService.loggedIn(user);
        }
      }
    );
  }

  authenticate() {
    if(AuthenticationService.isAuthorized()){
      this.authService.logout();
    } else{
      window.location.href = "/auth/github";
    }
    
  }

}
