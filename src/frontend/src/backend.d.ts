import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    price: number;
}
export interface OrderItem {
    productId: bigint;
    productName: string;
    quantity: bigint;
    unitPrice: number;
}
export interface Order {
    id: bigint;
    customerName: string;
    status: OrderStatus;
    total: number;
    gstAmount: number;
    timestamp: bigint;
    customerId: Principal;
    items: Array<OrderItem>;
    subtotal: number;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum Category {
    tea = "tea",
    biscuits = "biscuits",
    snacks = "snacks",
    coffee = "coffee"
}
export enum OrderStatus {
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrder(id: bigint): Promise<Order>;
    getOrders(): Promise<Array<Order>>;
    getProduct(id: bigint): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    init(): Promise<void>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(customerName: string, items: Array<OrderItem>): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(id: bigint, status: OrderStatus): Promise<void>;
    updateProduct(product: Product): Promise<void>;
}
