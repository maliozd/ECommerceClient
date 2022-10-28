import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { AuthService } from './services/common/auth.service';
// import { ComponentName, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { HttpClientService } from './services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router, private toastr: CustomToastrService) {
    authService.checkIdentity();
  }
  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.checkIdentity();
    this.router.navigate([""])
    this.toastr.message("Logged out", "", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    })
  };

  
}




