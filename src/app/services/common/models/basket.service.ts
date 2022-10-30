import { EventEmitter, Injectable, Output } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_BasketItem } from 'src/app/contracts/basket/create-basket-item';
import { List_BasketItem } from 'src/app/contracts/basket/list-basket-item';
import { Update_BasketItem } from 'src/app/contracts/basket/update-basket-item';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }


  async getBasketItemsAsync(): Promise<List_BasketItem[]> {
    const observable: Observable<List_BasketItem[]> = this.httpClientService.get({
      controller: "baskets"
    });
    let items = await firstValueFrom(observable);
    if (items.length > 0)
      return items;
    else
      return [];
  }

  async addBasketItemAsync(productItem: Create_BasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "baskets"
    }, productItem);
    await firstValueFrom(observable);
  }
  async updateBasketItemQuantityAsync(basketItem: Update_BasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.put({
      controller: "baskets"
    }, basketItem);
    await firstValueFrom(observable);
  }

  async removeBasketItemAsync(basketItemId: number): Promise<void> {
    const observable: Observable<any> = this.httpClientService.delete({
      controller: "baskets"
    }, basketItemId);
    await firstValueFrom(observable);
  }
}
