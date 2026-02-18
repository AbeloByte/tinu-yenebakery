"use client";

import { useState } from "react";

import OrderSummary from "@/components/customer/OrderSummary";
import PickupSelector from "@/components/customer/PickupSelector";
import ProductCard from "@/components/customer/ProductCard";
import { useCart } from "@/hooks/useCart";
import type { PickupWindow } from "@/types/order";
import type { Product } from "@/types/product";

const PRODUCTS: Product[] = [
    {
        id: "prod-1",
        name: "Butter Croissant",
        description: "Flaky, buttery layers baked fresh every morning.",
        price: 3.5,
        isAvailable: true,
    },
    {
        id: "prod-2",
        name: "Chocolate Muffin",
        description: "Moist muffin with dark chocolate chunks.",
        price: 4,
        isAvailable: true,
    },
    {
        id: "prod-3",
        name: "Sourdough Loaf",
        description: "Traditional crusty sourdough bread loaf.",
        price: 6.75,
        isAvailable: true,
    },
];

const CustomerPage = () => {
    const { items, addItem, updateQuantity, total, itemCount } = useCart();
    const [pickupWindow, setPickupWindow] = useState<PickupWindow>("MORNING");

    const increaseItem = (productId: string) => {
        const currentItem = items.find((item) => item.id === productId);
        if (!currentItem) return;
        updateQuantity(productId, currentItem.quantity + 1);
    };

    const decreaseItem = (productId: string) => {
        const currentItem = items.find((item) => item.id === productId);
        if (!currentItem) return;
        updateQuantity(productId, currentItem.quantity - 1);
    };

    return (
        <main className="">
            <div className="mb-10 flex flex-col items-center text-center h-2/12">
                <span className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
                    Our Menu
                </span>
                <h1 className="font-serif text-3xl text-foreground md:text-4xl text-balance">
                    All Products
                </h1>
                <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
                    Browse our full selection of freshly baked goods. Everything
                    is made to order just for you.
                </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[2fr_1fr]">
                <section>
                    <h2 className="text-2xl font-semibold">
                        Order Fresh Bakes
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Pick your bakery items and choose a pickup window.
                    </p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {PRODUCTS.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={addItem}
                            />
                        ))}
                    </div>
                </section>

                <aside className="space-y-4">
                    <div className="rounded-lg border  p-4 shadow-sm">
                        <p className="text-sm">
                            Items in cart:{" "}
                            <span className="font-semibold">{itemCount}</span>
                        </p>
                    </div>
                    <PickupSelector
                        value={pickupWindow}
                        onChange={setPickupWindow}
                    />
                    <OrderSummary
                        items={items}
                        total={total}
                        onIncrease={increaseItem}
                        onDecrease={decreaseItem}
                    />
                </aside>
            </div>
        </main>
    );
};

export default CustomerPage;
