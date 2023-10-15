import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Single_Category } from 'src/app/contracts/category/category';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService: HttpClientService) { }

  async getParentCategories() {
    const observable: Observable<any> = this.httpClientService.get({
      controller: "category",
      action: "getMainCategories"
    });
    const categoryResponseObject = await firstValueFrom(observable);
    const categories: Single_Category[] = categoryResponseObject.categories;
    return categories;
    // return categories
  }

  async getAllCategoriesPaged(page: number, size: number): Promise<{ totalCount: number, categories: Single_Category[] }> {
    const observable: Observable<{ totalCount: number, categories: Single_Category[] }> = this.httpClientService.get({
      controller: "category",
      queryString: `page=${page}&size=${size}`
    })

    return await firstValueFrom(observable);

  }

  async getChildCategoriesByParentId(parentCategoryId: string) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: "category",
      action: "GetSubCategories",
    }, parentCategoryId);

    const categoryResponseObject = await firstValueFrom(observable);
    const childCategories = categoryResponseObject.childCategories;
    return childCategories;
  }

  async getCategoryById(categoryId: string): Promise<Single_Category> {
    const observable: Observable<any> = this.httpClientService.get({
      controller: "category",
    }, categoryId);
    return await firstValueFrom(observable);
  }
}
