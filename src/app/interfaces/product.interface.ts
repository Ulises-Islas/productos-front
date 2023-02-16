import { ProductCategory } from './product-category.interface';
export interface Product {
    id?:           number;
    name?:         string;
    price?:        number;
    description?:  string;
    isActive?:     boolean;
    creationDate?: Date;
    category?:     ProductCategory;
}