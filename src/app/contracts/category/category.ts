export class Category {
    id: string;
    name: string;
    parentCategory? : Category;
    childCategory? : Category
}