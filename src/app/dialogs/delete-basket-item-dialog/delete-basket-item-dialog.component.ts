import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { BaseDialog } from '../base/base-dialog';
declare var $ : any;
@Component({
  selector: 'app-delete-basket-item-dialog',
  templateUrl: './delete-basket-item-dialog.component.html',
  styleUrls: ['./delete-basket-item-dialog.component.scss']
})
export class DeleteBasketItemDialogComponent extends BaseDialog<DeleteBasketItemDialogComponent> implements OnDestroy {

  constructor(dialogRef: MatDialogRef<DeleteBasketItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BasketItemDeleteState) {
    super(dialogRef)
  }
  ngOnDestroy(): void {
    $("#basketModal").modal("show");
  }

  ngOnInit(): void {
  }

}

export enum BasketItemDeleteState {
  Yes,
  No
}