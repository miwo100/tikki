import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {

    userIsloggedIn: EventEmitter<boolean>;

    constructor() {
        this.userIsloggedIn = new EventEmitter<boolean>();
    }

    loggedIn(loggedInUser: User): void {
            window.localStorage.setItem('user', JSON.stringify(loggedInUser));
            this.userIsloggedIn.emit(true);
    }

    logout(): void {
        window.localStorage.removeItem('user');
        this.userIsloggedIn.emit(false);
    }

    static isAuthorized(): boolean {
        return !!window.localStorage.getItem('user');
    }

    public get currentUser(): User {
        if (AuthenticationService.isAuthorized()) {
            return (<User>JSON.parse(window.localStorage.getItem('user')));
        }
        return null;
    }
}