import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_BasketItem } from 'src/app/contracts/basket/list-basket-item';
import { Update_BasketItem } from 'src/app/contracts/basket/update-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';

declare var $: any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService) {
    super(spinner)
  }
  basketItems: List_BasketItem[];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallScalePulse);
    this.basketItems = await this.basketService.getBasketItemsAsync();
    this.basketService.addBasketItemEventEmitter.subscribe(product => {
      let index = -1;
      index = this.basketItems.findIndex(
        p => p.basketItemId === product.id
      );
      if (index != -1) {
        this.basketItems[index].quantity += 1;
      } else if (index === -1) {
        var addedItem = new List_BasketItem();
        addedItem.basketItemId = product.id;
        addedItem.name = product.name;
        addedItem.quantity = 1;
        addedItem.price = product.price;
        this.basketItems.push(addedItem);
      }      
    });
    this.hideSpinner(SpinnerType.BallScalePulse);
  }

  async changeItemQuantity(inputObject: any) {
    this.showSpinner(SpinnerType.BallTrianglePath)
    const basketItemId = inputObject.target.attributes["id"].value;
    const quantity: number = inputObject.target.value;
    const basketItem: Update_BasketItem = new Update_BasketItem();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateBasketItemQuantityAsync(basketItem);
    this.hideSpinner(SpinnerType.BallTrianglePath);
  }

  async removeBasketItem(basketItemId: number) {
    this.showSpinner(SpinnerType.BallScalePulse);
    await this.basketService.removeBasketItemAsync(basketItemId)

    $(".basketItem-" + basketItemId).fadeOut(746, () =>
      this.hideSpinner(SpinnerType.BallScalePulse)
    );
  }

  async addBasketItem() {

  }
}
