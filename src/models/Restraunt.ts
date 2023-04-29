export interface Category {
    _id:              string;
    user:             string;
    name:             string;
    image:            string;
    items:            Item[];
    description:      string;
    cuisine:          string;
    createdAt:        string;
    updatedAt:        string;
}

export interface Item {
    _id:              string;
    price:            number;
    bestselling:      boolean;
    user:             string;
    name:             string;
    category:         string;
    image:            string;
    config:           string;
    addons:           string;
    description:      string;
    createdAt:        string;
    updatedAt:        string;
    quantity:         number;
    selectedConfig?:   Config;
}

export interface CategoriesAndItems {
    status:           string;
    categories:       Category[];
}

export interface QuantityMatrix {
    id:           string;
    quantity:     number;
}

export interface Config {
    _id:          string;
    name:         string;
    price:        number;
}

export interface CartItem {
    item:           Item;
    quantity:       number;
    selectedConfig: Config;
}

export interface  User{
    firstName: string;
    lastName: string;
    email: string;
    ownerType: string;
    password?: string;
}

export interface RestrauntUser{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    categories: Category[];
    companyName: string;
    country: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    mobileNumber: string;
    role: string;
    ownerType: string;
    createdAt: string;
}

export interface Order{

    _id: string;
    items: CartItem[];
    orderType: string;
    status: string;
    price: string;
    user: string;
    placed_time: string;
    address: string;
    createdAt: string;
    updatedAt: string;

}
