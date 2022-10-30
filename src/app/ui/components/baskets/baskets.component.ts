import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_BasketItem } from 'src/app/contracts/basket/list-basket-item';
import { Update_BasketItem } from 'src/app/contracts/basket/update-basket-item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { List_Product } from 'src/app/contracts/products/list_product';
import { CompletePurchaseDialogComponent, CompletePurchaseDialogState } from 'src/app/dialogs/complete-purchase-dialog/complete-purchase-dialog.component';
import { BasketItemDeleteState, DeleteBasketItemDialogComponent } from 'src/app/dialogs/delete-basket-item-dialog/delete-basket-item-dialog.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $: any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService, private authService: AuthService, private orderService: OrderService, private toastrService: CustomToastrService, private router: Router, private dialogService: DialogService) {
    super(spinner)
  }
  basketItems: List_BasketItem[];
  async ngOnInit() {
    if (this.authService.isAuthenticated) {
      this.showSpinner(SpinnerType.BallScalePulse);
      this.basketItems = await this.getBasketItemsOnInit();

      this.hideSpinner(SpinnerType.BallScalePulse);
    }
  }

  async getBasketItemsOnInit() {
    let basketItemsO = await this.basketService.getBasketItemsAsync();
    if (basketItemsO.length > 0)
      return basketItemsO
    else
      return [];
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

  removeBasketItem(basketItemId: number) {
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType: DeleteBasketItemDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallScalePulse);
        await this.basketService.removeBasketItemAsync(basketItemId)
        $("#basketModal").modal("show");

        $(".basketItem-" + basketItemId).fadeOut(755, () =>
          this.hideSpinner(SpinnerType.BallScalePulse)
        )
      }
    });
  }

  async completePurchase() {
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType: CompletePurchaseDialogComponent,
      data: CompletePurchaseDialogState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallScalePulse);
        const order: Create_Order = new Create_Order();
        order.address = "Sakarya";
        order.description = "New order";
        await this.orderService.createOrder(order);
        this.hideSpinner(SpinnerType.BallScalePulse);
        this.toastrService.message("Order created", "Successfull", {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.TopLeft
        });
        this.router.navigate([""])
      }
    })

  }
}
