import { Product } from '../types/Product';

export async function fetchAllProducts(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

export async function fetchCategories(): Promise<string[]> {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
}