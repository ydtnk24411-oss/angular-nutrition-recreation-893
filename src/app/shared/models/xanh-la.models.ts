export interface XanhLaCategory {
  name: string;
  slug: string;
  image: string;
}

export interface XanhLaProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  priceNumber: number;
  image: string;
  category: 'Vegetables' | 'Fruits' | 'Meat';
  categoryVi: string;
  container: string;
  cutType: string;
  cutting: string;
  packSize: string;
  packaging: string;
  preparation: string;
  quantity: string;
  ripeness: string;
  sizeGroup: string;
  thickness: string;
  type: string;
  weight: string;
  description: string;
  options?: { name: string; values: string[] }[];
}

export interface XanhLaMeal {
  name: string;
  nutrition: string;
  image: string;
}

export interface XanhLaNutritionGoal {
  name: string;
  image: string;
}

export interface XanhLaUser {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface XanhLaCartItem {
  product: XanhLaProduct;
  quantity: number;
  selectedOption?: string;
}

export interface EventItem {
  id: string;
  name: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  description: string;
  action: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: string;
  status: string;
  action: string;
  description: string;
}

export interface NavItem {
  label: string;
  path: string;
}
