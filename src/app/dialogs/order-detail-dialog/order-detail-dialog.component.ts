import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { Single_Order } from 'src/app/contracts/order/single_order';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';
import { CompleteOrderDialogComponent, CompleteOrderDialogState } from '../complete-order-dialog/complete-order-dialog.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<OrderDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService, private dialogService: DialogService, private spinner: NgxSpinnerService, private toastrService: CustomToastrService) {
    super(dialogRef)
  }

  singleOrder: Single_Order
  displayedColumns: string[] = ['name', 'quantity', 'price', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  orderTotalPrice: number


  async ngOnInit() {
    this.singleOrder = await this.orderService.getOrderById(this.data as string);
    console.log(this.singleOrder);
    this.dataSource = this.singleOrder.basketItems;
    this.orderTotalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

  async completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderDialogState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallScalePulse);
        await this.orderService.completeOrder(this.data as string)
        this.spinner.hide(SpinnerType.BallScalePulse);
        this.toastrService.message("Order successfully completed.", "Successfull", {
          position: ToastrPosition.TopCenter,
          messageType: ToastrMessageType.Success
        });
        
      }
    })
  }

}

export enum OrderDetailDialogState {
  Close,
  Completed
}



