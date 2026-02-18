import type { Product } from "./product";

export type OrderStatus = "PENDING" | "CONFIRMED" | "READY" | "COMPLETED";

export type CartItem = Product & {
    quantity: number;
};

export type PickupWindow = "MORNING" | "AFTERNOON" | "EVENING";

export type Order = {
    id: string;
    customerName: string;
    customerPhone: string;
    status: OrderStatus;
    pickupWindow: PickupWindow;
    items: CartItem[];
    total: number;
    createdAt: string;
};
