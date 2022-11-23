import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService : UserService) { }

  username : String

 async  ngOnInit() {
   this.username = await this.userService.getActiveUserUsername();
  }

}
