"use client";

import type { CartItem } from "@/types/order";
import { formatCurrency } from "@/utils/currency";

import QuantitySelector from "./QuantitySelector";

type OrderSummaryProps = {
    items: CartItem[];
    total: number;
    onIncrease: (productId: string) => void;
    onDecrease: (productId: string) => void;
};

const OrderSummary = ({
    items,
    total,
    onIncrease,
    onDecrease,
}: OrderSummaryProps) => {
    return (
        <section className="rounded-lg border  p-4 shadow-sm">
            <h3 className="text-base font-semibold">Order Summary</h3>

            {items.length === 0 ? (
                <p className="mt-3 text-sm text-gray-600">
                    Your cart is empty.
                </p>
            ) : (
                <ul className="mt-4 space-y-3">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="space-y-2 border-b pb-3 last:border-b-0"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    {item.name}
                                </span>
                                <span className="text-sm">
                                    {formatCurrency(item.price * item.quantity)}
                                </span>
                            </div>
                            <QuantitySelector
                                quantity={item.quantity}
                                onIncrease={() => onIncrease(item.id)}
                                onDecrease={() => onDecrease(item.id)}
                            />
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4 flex items-center justify-between border-t pt-3">
                <span className="text-sm font-medium">Total</span>
                <span className="text-sm font-semibold">
                    {formatCurrency(total)}
                </span>
            </div>
        </section>
    );
};

export default OrderSummary;
