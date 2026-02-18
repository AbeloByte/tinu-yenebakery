"use client";

import { useMemo, useState } from "react";

import type { CartItem } from "@/types/order";
import type { Product } from "@/types/product";

export const useCart = () => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product) => {
        setItems((previousItems) => {
            const existingItem = previousItems.find(
                (item) => item.id === product.id,
            );

            if (!existingItem) {
                return [...previousItems, { ...product, quantity: 1 }];
            }

            return previousItems.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            );
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }

        setItems((previousItems) =>
            previousItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item,
            ),
        );
    };

    const removeItem = (productId: string) => {
        setItems((previousItems) =>
            previousItems.filter((item) => item.id !== productId),
        );
    };

    const clearCart = () => setItems([]);

    const total = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items],
    );

    const itemCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items],
    );

    return {
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        total,
        itemCount,
    };
};
