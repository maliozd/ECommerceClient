import { CategoryIdName } from "../category/categoryIdName"
import { Product_Image } from "../productImage/list_product_image"

export class List_Product {
id:string
name : string
stock : number
price : number
createdDate : Date
updatedDate : Date
productImageFiles? : Product_Image[];
category : CategoryIdName;
}