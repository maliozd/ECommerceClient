import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  checkIdentity() {
    const token: string = localStorage.getItem("accessToken");

    let isExpired: boolean;
    try {
      isExpired = this.jwtHelper.isTokenExpired(token);
    }
    catch {
      isExpired = true;
    }
    _isAuthenticated = token != null && !isExpired;
  }
  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;
