// This file exports the data models used in the application, defining the structure of the data and interactions with the database.

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
}

export interface Order {
    id: string;
    userId: string;
    productIds: string[];
    totalAmount: number;
    createdAt: Date;
}