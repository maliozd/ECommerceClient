import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/products/create_product';
import { List_Product } from 'src/app/contracts/products/list_product';
import { List_Product_Image } from 'src/app/contracts/productImage/list_product_image';
import { HttpClientService } from "src/app/services/common/http-client.service"

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

  async getProduct(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMesage: string) => void): Promise<{ totalCount: number, products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number, products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise()
    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData
  }
  async delete(id: number) {
    const deletedObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);
    await firstValueFrom(deletedObservable);
  }
  async readImages(id: number, successCallBack?: () => void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getProductImages",
      controller: "products"
    }, id)
    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    return images;
  }
  async deleteImage(id: number, imageId: number, successCallBack?: () => void) {
    const deletedObservable = this.httpClientService.delete({
      action: "deleteProductImage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deletedObservable);
    successCallBack();
  }

  async changeShowcaseImage(imageId: number, productId: number, successCallBack?: () => void): Promise<void> {
    const observable = this.httpClientService.put({
      controller: "products",
      action: "ChangeProductImageShowcase"
    }, {
      imageId: imageId,
      productId: productId
    });
    debugger
    await firstValueFrom(observable);
    successCallBack();
  }
}



