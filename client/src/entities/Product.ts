import PageResponse from "./PageResponse";
import { UserData } from "./User";

export interface ProductImageModel {
  productImageId: number;
  productImage: string;
}

export interface ProductModel {
  productId: number;
  category: string;
  productCondition: string;
  availability: string;
  productName: string;
  price: number;
  brand: string;
  description: string;
  timestamp: string;
  productImages: ProductImageModel[];
  user: UserData;
}

export default interface ProductResponse {
  productModels: ProductModel[];
  pageResponse: PageResponse;
}
