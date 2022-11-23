import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SingleUser } from 'src/app/contracts/users/single_user';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  singleUser: SingleUser
  displayedColumns: string[] = ["username", "nameSurname", "address", "email", "phoneNumber", "isEmailConfirmed", "isTwoFactorEnabled", "isEmailConfirmed"]


  async ngOnInit() {
    this.singleUser = await this.userService.getUser();
    console.log(this.singleUser)
  }

}
