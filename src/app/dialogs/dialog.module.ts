import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FormsModule } from '@angular/forms';
import { DeleteBasketItemDialogComponent } from './delete-basket-item-dialog/delete-basket-item-dialog.component';
import { CompletePurchaseDialogComponent } from './complete-purchase-dialog/complete-purchase-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';





@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    DeleteBasketItemDialogComponent,
    CompletePurchaseDialogComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule, MatTableModule,MatToolbarModule,
    FileUploadModule,
    FormsModule

  ]

})
export class DialogModule { }
