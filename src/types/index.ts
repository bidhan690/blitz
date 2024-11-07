import { FileWithPath } from "react-dropzone";


export type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  images: string[];
  categoryName: string;
  subCategoryName: string;
  rating: number;
  quantity: number;
  slug: string;
  categories?: Category;
  subCategories?: SubCategory;
};

type Category = {
  id: string;
  name: string;
  description?: string;
  slug: string;
};

type SubCategory = {
  id: string;
  name: string;
  categoryName?: string;
  description?: string;
  slug: string;
};

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface Cart_Item {
  id: string;
  productId: string;
  quantity: number;
  cartId: string;
  product: Product;
}
