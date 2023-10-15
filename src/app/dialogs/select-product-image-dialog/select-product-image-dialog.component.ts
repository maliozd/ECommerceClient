import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { Product_Image } from 'src/app/contracts/productImage/list_product_image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  selectedRadioImageId: string

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private dialogService: DialogService,
    private spinnerService: NgxSpinnerService) {
    super(dialogRef)
  }
  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png , .jpg , .jpeg, .gif",
    action: "Upload",
    controller: "products",
    explanation: "Choose product picture or drag into it.",
    isAdminPage: true,
    queryString: `id=${this.data}`
  }


  images: Product_Image[];
  async ngOnInit() {
    this.images = await this.productService.readImages(this.data as string)
    this.images.forEach((image) => {
      if (image.showcase){
        this.selectedRadioImageId = image.id;
      }
    })


  }
  async deleteImage(imageId: string, event: any) {
    debugger
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        debugger
        await this.productService.deleteImage(this.data as string, imageId, () => {
          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(500);
        })
      }
    })
  }
  setShowcaseImage(imageId: string) {
    this.spinnerService.show(SpinnerType.BallScalePulse);
    debugger
    this.productService.changeShowcaseImage(imageId, this.data as string, () => {
      this.spinnerService.hide(SpinnerType.BallScalePulse)
      this.selectedRadioImageId = imageId;
    })
  }

}
export enum SelectProductImageState {
  Close
}
