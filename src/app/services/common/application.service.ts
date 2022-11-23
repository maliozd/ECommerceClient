import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Menu } from 'src/app/contracts/app-configurations/menu';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private htppClientService: HttpClientService) {

  }

  async getAuthorizeDefinitionEndpoints() {
    const observable: Observable<Menu[]> = this.htppClientService.get<Menu[]>({
      controller: "appService"
    });

    const menus = await firstValueFrom(observable);
    console.log(menus)
    return menus;
  }
}
