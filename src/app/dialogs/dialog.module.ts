import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FormsModule } from '@angular/forms';
import { DeleteBasketItemDialogComponent } from './delete-basket-item-dialog/delete-basket-item-dialog.component';
import { CompletePurchaseDialogComponent } from './complete-purchase-dialog/complete-purchase-dialog.component';





@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    DeleteBasketItemDialogComponent,
    CompletePurchaseDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule,
    FileUploadModule,
    FormsModule

  ]

})
export class DialogModule { }
