import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { JwtToken } from 'src/app/contracts/token/jwtToken';
import { JwtTokenResponse } from 'src/app/contracts/token/jwtTokenResponse';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entitites/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService,private toastrService : CustomToastrService) { }
  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> =
      this.httpClientService.post<Create_User | User>(
        {
          controller: 'users',
        },
        user
      );
    return (await firstValueFrom(observable)) as Create_User;
  }
  async login(
    usernameOrEmail: string,
    password: string,
    callBackFunction?: () => void
  ): Promise<any> {
    //promise olduğunu bildirmek zorunda değiliz
    const observable: Observable<any | JwtTokenResponse> = this.httpClientService.post<
      any | JwtTokenResponse>(
        {
          
          controller: 'Users',
          action: 'Login',
        },
        {
          usernameOrEmail: usernameOrEmail,
          password: password,
        }
      );
    const tokenResponse: JwtTokenResponse = (await firstValueFrom(observable)) as JwtTokenResponse;
    if (tokenResponse) {
      this.toastrService.message("Successful login.","Success",{
        messageType: ToastrMessageType.Success,
        position : ToastrPosition.TopLeft
      })
      localStorage.setItem('accessToken',tokenResponse.token.accessToken);
      console.log(tokenResponse)
      console.log(tokenResponse.token.accessToken)
    }
    callBackFunction();
  }
}
