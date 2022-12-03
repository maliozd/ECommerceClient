import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CategoryIdName } from 'src/app/contracts/category/categoryIdName';
import { Create_Product } from "src/app/contracts/products/create_product"
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService, private categoryService: CategoryService) {
    super(spinner)
  }

  async ngOnInit() {
    this.categories = await this.categoryService.getParentCategories();
  }

  categories: CategoryIdName[];
  childCategories: CategoryIdName[];
  selectedCategoryId: string
  parentCategorySelected: boolean = false;
  
  @Output() productToCreate: EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Choose file or drag into it.",
    isAdminPage: true,
    accept: ".jpg, .png, .jpeg, .json"
  } //dışardaki bir componente gidecek.

  createP(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement,selectedCategoryId) {
    this.showSpinner(SpinnerType.BallSpinFadeRotating)
    const createdProduct: Create_Product = new Create_Product()
    createdProduct.name = name.value;
    createdProduct.price = stock.valueAsNumber
    createdProduct.stock = price.valueAsNumber
    createdProduct.categoryId = selectedCategoryId;
    debugger
    this.productService.createProduct(createdProduct, () => {  //işlem başarılı olduysa callback fonksiyonu ile yapılan islemler -->
      this.hideSpinner(SpinnerType.BallSpinFadeRotating)
      this.alertify.message("Product successfully added.",
        {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
      this.productToCreate.emit(createdProduct);   //create componenti referans eden componente fırlattık.
    }, errorMesage => {
      this.alertify.message(errorMesage, {
        position: Position.TopCenter,
        messageType: MessageType.Error,
        dismissOthers: true
      })
    })



  }

  async mainCategorySelected(parentCategoryId) {
    let childCats = await this.categoryService.getChildCategoriesByParentId(parentCategoryId);
    if (childCats) {
      this.childCategories = childCats;
      this.parentCategorySelected = true;
      this.selectedCategoryId = parentCategoryId;
    }
  }

  async childCategorySelected(childCategoryId) {
    this.selectedCategoryId = childCategoryId;
  }
}
