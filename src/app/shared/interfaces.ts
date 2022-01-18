export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  email: string;
  country: string;
  password: string;
  mobile?: number;
  address?: string;
  socialNetwork?: string;
}

export interface UserUpdate {
  name: string;
  email: string;
  country: string;
  mobile?: number;
  address?: string;
  socialNetwork?: string;
  id?: string
}

export interface socialNetwork {
  facebook?: string,
  instagram?: string,
  telegram?: string
}

export interface CountryData {
  img: string;
  address: string;
  company: string;
}
export interface Product {
  category: string;
  price: number;
  name: string;
  description: string; //short description
  details: string; //full description
  producerName: string;
  seller_id: string
  photo: string;
  created: Date;
  id: string;
}

export interface AddProduct {
  category: string;
  price: number;
  name: string;
  description: string; //short description
  details: string; //full description
  photo: File | '';
}

export interface UpdateProduct {
  category: string;
  price: number;
  name: string;
  description: string; //short description
  details: string; //full description
  id?: string;
}

export interface Seller {
  id: string,
  name: string;
  email: string;
  country: string;
  mobile: number;
  address: string;
  socialNetwork?: string[]|string;
  photo: File | null
}

export interface Buyer {
  id: string,
  name: string;
  email: string;
  country: string;
  favoriteSellers: string[];
}  

export interface getSeller {
  id?: string,
  name: string;
  email: string;
  country: string;
  mobile: number;
  address: string;
  socialNetwork?: string[]|string;
  photo: string
} 

