import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
declare var $: any
@Component({
  selector: 'app-complete-purchase-dialog',
  templateUrl: './complete-purchase-dialog.component.html',
  styleUrls: ['./complete-purchase-dialog.component.scss']
})
export class CompletePurchaseDialogComponent extends BaseDialog<CompletePurchaseDialogComponent> implements OnDestroy {

  constructor(dialogRef: MatDialogRef<CompletePurchaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompletePurchaseDialogState) { super(dialogRef) }
  ngOnDestroy(): void {
    if (!this.showDialog) {
      $("#basketModal").modal("show");

    }
  }

  ngOnInit(): void {
  }

  showDialog: boolean = false

  yes() {
    this.showDialog = true;
  }
}

export enum CompletePurchaseDialogState {
  Yes,
  No

}