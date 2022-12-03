import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
// import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
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
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;
  constructor(public authService: AuthService, private router: Router, private toastr: CustomToastrService, private dynamicLoadComponentService: DynamicLoadComponentService) {
    authService.checkIdentity();
  }
  signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.authService.checkIdentity();
    this.router.navigate([""])
    this.toastr.message("Logged out", "", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    })
  };

  loadBasketComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
  

}




