export interface Fragrance {
  id: string;
  name: string;
  nameWithoutAccents: string;
  slug: string;
  image: string | null;
  brand: Brand;
  brandId: string;
  category: Category;
  categoryId: string;
  description: string | null;
  price: number;
  ingredients: Ingredient[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
