import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent {
  constructor(private userService: UserService, spinner: NgxSpinnerService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private socialAuthService: SocialAuthService) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.BallScalePulse)
      await userService.googleLoginAsync(user, () => {
        this.hideSpinner(SpinnerType.BallScalePulse)
        this.authService.checkIdentity();
        const returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl
        if (returnUrl) {
          this.router.navigate([returnUrl])
        }
        else {
          this.router.navigate([""])
        }
      })
    });
  }

  ngOnInit(): void { }
  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallScalePulse);
    await this.userService.login(usernameOrEmail, password, () => {
      this.authService.checkIdentity();
      const returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl
      if (returnUrl) {
        debugger
        this.router.navigate([returnUrl])
      }
      else {
        debugger
        this.router.navigate([""])
      }
    })
  }
}


    // this.activatedRoute.queryParams.subscribe(params => {
    //   debugger
    //   const returnUrl: string = params["returnUrl"];
    //   if (returnUrl != "login") {
    //     this.router.navigate([returnUrl])
    //   }
    //   this.router.navigate[""];
    // })
    // this.hideSpinner(SpinnerType.BallScalePulse)
//   });
// }

