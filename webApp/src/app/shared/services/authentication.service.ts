import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export default class AuthenticationService {

    userIsloggedIn: EventEmitter<boolean>;

    constructor() {
        this.userIsloggedIn = new EventEmitter();
    }

    login({username, password}): Promise<boolean> {
        return new Promise(resolve => {
            let validCredentials: boolean = false;

            // @NOTE: In a real scenario this check 
            // should be performed against a web service:
            if (username === 'miwo100' &&
                password === 'tinka100') {
                validCredentials = true;
                window.sessionStorage.setItem('token', 'tokenToBeRetrievedFromServer');
            }

            this.userIsloggedIn.emit(validCredentials);
            resolve(validCredentials);
        });
    }

    logout(): Promise<boolean> {
        return new Promise(resolve => {
            window.sessionStorage.removeItem('token');
            this.userIsloggedIn.emit(false);
            resolve(true);
        });
    }

    static isAuthorized(): boolean {
        return !!window.sessionStorage.getItem('token');
    }
}