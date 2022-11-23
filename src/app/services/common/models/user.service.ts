import { Injectable } from '@angular/core';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Create_User } from 'src/app/contracts/users/create_user';
import { SingleUser } from 'src/app/contracts/users/single_user';
import { User } from 'src/app/entitites/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }
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

  async getUser() {
    const observable: Observable<SingleUser> = await this.httpClientService.post({
      controller: "users",
      action: "getUserInfo"
    }, {});
    return await firstValueFrom(observable);
  }

  async getActiveUserUsername() {
    const user = await this.getUser();
    return user.username;
  }
}
