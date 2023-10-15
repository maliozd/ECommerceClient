import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/products/create_product';
import { List_Product } from 'src/app/contracts/products/list_product';
import { Product_Image } from 'src/app/contracts/productImage/list_product_image';
import { HttpClientService } from "src/app/services/common/http-client.service"
import { Single_Product } from 'src/app/contracts/products/single_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  createProduct(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMesage: string) => void) { //errorcallback fonksiyonu 
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {  //ilgili errorlar gelecek. key-value
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error  //anlamaya çalış. sadece kod fazla, oku anla.
      let message = "";
      _error.forEach((errorValue, index) => {
        errorValue.value.forEach((_value, _index) => {
          message += `${_value}<br>`
        })
      })
      errorCallBack(message);
    });
  }

  async getAllProducts(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMesage: string) => void): Promise<{ totalCount: number, products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number, products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise()
    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await promiseData
  }

  async updateProduct(product: Single_Product) {
    const observable = this.httpClientService.put({
      controller: "products",

    }, product);
    debugger
    return await firstValueFrom(observable);
  }

  async getProductById(id: string): Promise<Single_Product> {
    const observable: Observable<Single_Product> = this.httpClientService.get({
      controller: "products"
    }, id);
    return await firstValueFrom(observable);
  }


  async delete(id: string) {
    const deletedObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);
    await firstValueFrom(deletedObservable);
  }
  async readImages(id: string, successCallBack?: () => void): Promise<Product_Image[]> {
    const getObservable: Observable<Product_Image[]> = this.httpClientService.get<Product_Image[]>({
      action: "getProductImages",
      controller: "products"
    }, id)
    const images: Product_Image[] = await firstValueFrom(getObservable);
    return images;
  }
  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deletedObservable = this.httpClientService.delete({
      action: "deleteProductImage",
      controller: "products",
      queryString: `ImageId=${imageId}`
    }, id)
    await firstValueFrom(deletedObservable);
    successCallBack();
  }

  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
    const observable = this.httpClientService.put({
      controller: "products",
      action: "ChangeProductImageShowcase"
    }, {
      imageId: imageId,
      productId: productId
    });
    await firstValueFrom(observable);
  }




}



