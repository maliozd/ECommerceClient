import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogClose, MatDialog } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent extends BaseDialog<DeleteDialogComponent> {

  constructor(dialogRef: MatDialogRef<DeleteDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DeleteState) //extend edilen classın constructorına gönderilen nesne public olamaz.
     { 
      super(dialogRef)
    }

   
}
export enum DeleteState {
  Yes,
  No
}
