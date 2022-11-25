import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Category } from 'src/app/contracts/category/category';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService: HttpClientService) { }

  async getParentCategories() {
    const observable : Observable<any> = this.httpClientService.get({
      controller: "category",
      action : "getMainCategories"
    });
    const categoryResponseObject = await firstValueFrom(observable);
    const categories: Category[] = categoryResponseObject.categories;

    return categories;
    // return categories
  }

  async getChildCategoriesByParentId(parentCategoryId : string){
    const observable : Observable<any> = this.httpClientService.get({
      controller :"category",
      action:"GetSubCategories",      
    },parentCategoryId);

    const categoryResponseObject = await firstValueFrom(observable);
    const childCategories = categoryResponseObject.childCategories;
    return childCategories;
  }
}
