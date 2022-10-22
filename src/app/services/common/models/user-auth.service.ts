import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/TokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async login(
    usernameOrEmail: string,
    password: string,
    callBackFunction?: () => void
  ): Promise<any> {
    //promise olduğunu bildirmek zorunda değiliz
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<
      any | TokenResponse>(
        {
          controller: 'Auth',
          action: 'Login',
        },
        {
          usernameOrEmail: usernameOrEmail,
          password: password,
        }
      );
    const tokenResponse: TokenResponse = (await firstValueFrom(observable)) as TokenResponse;
    if (tokenResponse) {
      this.toastrService.message("Successful login.", "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopLeft
      })
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
    }
    callBackFunction();
  }

  async googleLoginAsync(user: SocialUser, callBackFunction?: () => void) {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller: "auth",
      action: "google-login"
    }, user);
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      this.toastrService.message("Google login success.", "Success login", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight
      });
    }
    callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void): Promise<any> {
    const observable : Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshTokenLogin",
      controller: "auth"
    }, {
      refreshToken: refreshToken
    });
    const tokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);     
  }
  callBackFunction();
}
}
