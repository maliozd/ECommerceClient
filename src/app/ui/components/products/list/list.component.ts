import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from 'src/app/contracts/products/list_product';
import { BaseUrl } from 'src/app/contracts/url/baseUrl';
import { FileService } from 'src/app/services/common/models/file-service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService) { }
  currentPageNo: number;
  totalProductCount: number
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: string

  products: List_Product[];

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data = await this.productService.getProduct(this.currentPageNo - 1, this.pageSize, () => {

      }, errorMessage => {

      });
      
      this.baseUrl = (await this.fileService.getBaseStorageUrlAsync()).baseStorageUrl
      debugger
      this.products = data.products
      this.products = this.products.map<List_Product>(p => {
        const showcaseImage = p.productImageFiles?.find(x=> x.showcase);
        const imagePath = showcaseImage ? `${showcaseImage.path}` : ""
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: imagePath,
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles
        };
        debugger
        return listProduct
      });

      this.totalProductCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      this.pageList = [];
      if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);
      }
      else if (this.currentPageNo + 3 >= this.totalPageCount) {
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);
      }
      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i)
    })
  }
}
