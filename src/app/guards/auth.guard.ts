import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from '../base/base.component';
import { _isAuthenticated } from '../services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
//npm i @auth0/angular-jwt --> elimizdeki tokenı tüm isteklerin headerlarına authorization ve bearer olarak ekleyecek yapılacak isteklerde token üzerinden yetkilendirilmesini sağlayacak. interceptor yapılanmasını kendimiz yazmadan bu kütüphane sayesinde, projedeki bütün istekleri etkileyeibliyoruz.
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastr: CustomToastrService, private spinner: NgxSpinnerService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
      this.toastr.message("You must login to see this page.", "Unauthorized!",{
        messageType : ToastrMessageType.Info,
        position : ToastrPosition.TopFullWidth
      })
    }



    return true;
  }
}


