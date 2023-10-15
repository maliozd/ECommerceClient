import { CategoryIdName } from "../category/categoryIdName";
import { Product_Image } from "../productImage/list_product_image";

export class Single_Product{
    id : string;
    name : string;
    stock : number
    price : number
    category : CategoryIdName
    productImage : Product_Image
}