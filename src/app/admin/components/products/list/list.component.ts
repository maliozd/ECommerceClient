import { Component, EventEmitter, Inject, OnInit, Output, ViewChild,  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product }  from "src/app/contracts/products/list_product"

import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { MatPaginator,  } from '@angular/material/paginator';
import { Create_Product } from 'src/app/contracts/products/create_product';
import { DialogService } from 'src/app/services/common/dialog.service';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { Router, RouterLink } from '@angular/router';
import { EditProductDialogComponent } from 'src/app/dialogs/edit-product-dialog/edit-product-dialog.component';
import { FileService } from 'src/app/services/common/models/file-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {


  constructor(private productService: ProductService,
     spinner: NgxSpinnerService,
      private alertifyService: AlertifyService,
      private dialogService : DialogService,
      private router : Router,
      private fileService : FileService) {
    super(spinner)
  }
  displayedColumns: string[] = ['photo','name', 'stock', 'price', 'createdDate','category' ,'updatedDate' ,"photos","edit","delete"];
  dataSource: MatTableDataSource<List_Product> = null
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  baseUrl: string

  async ngOnInit() {
    this.baseUrl = (await this.fileService.getBaseStorageUrlAsync()).baseStorageUrl
    this.getProducts();
  }
  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter()

  routeCat(categoryId : string){
    this.router.navigate([`admin/categories/${categoryId}`]);
  }
 
  //-------------------------------------
  async getProducts() {
    this.showSpinner(SpinnerType.BallSpinFadeRotating);
    const allProducts: { totalCount: number; products: List_Product[] } =
      await this.productService.getAllProducts(
        this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () =>
        this.hideSpinner(SpinnerType.BallSpinFadeRotating), errorMesage => this.alertifyService.message(errorMesage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopLeft
        }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products)   
    console.log(allProducts);
    this.paginator.length = allProducts.totalCount;
  
    // this.changeDetectorRef.detectChanges();
  }
  addProductImages(id : string){
    this.dialogService.openDialog({
      componentType : SelectProductImageDialogComponent,
       data : id,
       options : {
        width: "1000px"
       }
    })
  }

  editProduct(id:string){
    this.dialogService.openDialog({
      componentType : EditProductDialogComponent,
      data: id
    })
  }

  async pageChanged() {
    await this.getProducts();
  }

 
    
  
}

