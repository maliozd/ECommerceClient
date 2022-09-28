import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/products/create_product';

import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner)
  }

  ngOnInit(): void {

    // this.httpClientService.get<Create_Product[]>({
    //   controller:"products"
    //   //fullEndPoint = weatherforecast.com/api... -->end point ile buraya istek gönderebilirim
    // }).subscribe(data => console.log(data)
    // );
  }
  @ViewChild(ListComponent) listCompoenents : ListComponent  //product componentin altındaki component
  productToCreate(productToCreate: Create_Product) {
    this.listCompoenents.getProducts();
  }
  

}
