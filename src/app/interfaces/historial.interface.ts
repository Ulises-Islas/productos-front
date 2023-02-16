import { Product } from './product.interface';
import { ProductCategory } from './product-category.interface';
export interface Historical {
    id: number;
    product?:   Product;
    category?:  ProductCategory;
    action:     string;
    actionDate: Date;
}