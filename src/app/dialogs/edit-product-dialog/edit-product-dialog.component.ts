import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Single_Category } from 'src/app/contracts/category/category';
import { CategoryIdName } from 'src/app/contracts/category/categoryIdName';
import { Single_Product } from 'src/app/contracts/products/single_product';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent extends BaseDialog<EditProductDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<EditProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private productService: ProductService, private categoryService: CategoryService) {
    super(dialogRef)
  }
  productToUpdate: Single_Product;
  mainCategories : CategoryIdName[];
  async ngOnInit() {
    this.productToUpdate = await this.productService.getProductById(this.data);
    this.mainCategories = await this.categoryService.getParentCategories(); 
    console.log(this.mainCategories)
  }

}
