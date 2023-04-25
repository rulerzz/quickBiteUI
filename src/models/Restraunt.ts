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


