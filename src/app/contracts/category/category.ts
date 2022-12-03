export class Single_Category {
    id: string;
    name: string;
    createdDate : Date;
    parentCategory? : Single_Category;
    childCategories? : string[];
}