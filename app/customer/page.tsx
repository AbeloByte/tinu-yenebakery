"use client";

import { useEffect, useMemo, useState } from "react";

import OrderSummary from "@/components/customer/OrderSummary";
import ProductCard from "@/components/customer/ProductCard";
import { useCart } from "@/hooks/useCart";
import type { PickupWindow } from "@/types/order";
import type { Product } from "@/types/product";
import { PICKUP_WINDOWS } from "@/utils/constants";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const today = useMemo(() => new Date(), []);
    const tomorrow = useMemo(
        () =>
            new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 1,
            ),
        [today],
    );
    const [displayedMonth, setDisplayedMonth] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1),
    );
    const [selectedDate, setSelectedDate] = useState<Date>(tomorrow);
    const [selectedTimeRange, setSelectedTimeRange] =
        useState<PickupWindow>("MORNING");

    const isCurrentMonth =
        displayedMonth.getFullYear() === today.getFullYear() &&
        displayedMonth.getMonth() === today.getMonth();

    const monthLabel = displayedMonth.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    });

    const firstDayOfMonth = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth(),
        1,
    );
    const daysInMonth = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth() + 1,
        0,
    ).getDate();
    const leadingEmptyCells = (firstDayOfMonth.getDay() + 6) % 7;

    useEffect(() => {
        setIsCartOpen(itemCount > 0);
    }, [itemCount]);

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
            <div className="mx-auto w-full max-w-7xl px-6 py-8">
                {/*   */}
                <section>
                    <h2 className="text-2xl font-semibold">
                        Order Fresh Bakes
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Pick your bakery items and add them to your cart.
                    </p>
                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {PRODUCTS.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={addItem}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <div
                aria-hidden={!(itemCount > 0 && isCartOpen)}
                className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
                    itemCount > 0 && isCartOpen
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
                onClick={() => setIsCartOpen(false)}
            />

            <aside
                aria-hidden={!(itemCount > 0 && isCartOpen)}
                className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
                    itemCount > 0 && isCartOpen
                        ? "translate-x-0"
                        : "pointer-events-none translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between border-b px-5 py-4">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            Your Cart
                        </h3>
                        <p className="text-xs text-gray-600">
                            Items in cart: {itemCount}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => setIsCartOpen(false)}
                        aria-label="Close cart"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <OrderSummary
                        items={items}
                        total={total}
                        onIncrease={increaseItem}
                        onDecrease={decreaseItem}
                    />
                </div>

                <div className="border-t bg-white p-4">
                    <button
                        type="button"
                        className="w-full rounded-full border px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                        onClick={() =>
                            setIsScheduleOpen((previous) => !previous)
                        }
                    >
                        Choose Scheduled Date
                    </button>

                    {isScheduleOpen ? (
                        <div className="mt-4 space-y-4">
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Select delivery date
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            disabled={isCurrentMonth}
                                            onClick={() =>
                                                setDisplayedMonth(
                                                    (previous) =>
                                                        new Date(
                                                            previous.getFullYear(),
                                                            previous.getMonth() -
                                                                1,
                                                            1,
                                                        ),
                                                )
                                            }
                                            className="rounded-md border px-2 py-1 text-xs text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                                        >
                                            Prev
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setDisplayedMonth(
                                                    (previous) =>
                                                        new Date(
                                                            previous.getFullYear(),
                                                            previous.getMonth() +
                                                                1,
                                                            1,
                                                        ),
                                                )
                                            }
                                            className="rounded-md border px-2 py-1 text-xs text-gray-600 transition hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>

                                <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-gray-700">
                                    {monthLabel}
                                </p>

                                <div className="grid grid-cols-7 gap-1">
                                    {WEEK_DAYS.map((day) => (
                                        <span
                                            key={day}
                                            className="pb-1 text-center text-xs font-semibold text-amber-950"
                                        >
                                            {day}
                                        </span>
                                    ))}

                                    {Array.from({
                                        length: leadingEmptyCells,
                                    }).map((_, index) => (
                                        <span key={`empty-${index}`} />
                                    ))}

                                    {Array.from({ length: daysInMonth }).map(
                                        (_, index) => {
                                            const dayNumber = index + 1;
                                            const dayDate = new Date(
                                                displayedMonth.getFullYear(),
                                                displayedMonth.getMonth(),
                                                dayNumber,
                                            );
                                            const isDisabled =
                                                dayDate < tomorrow;
                                            const isSelected =
                                                selectedDate.getFullYear() ===
                                                    dayDate.getFullYear() &&
                                                selectedDate.getMonth() ===
                                                    dayDate.getMonth() &&
                                                selectedDate.getDate() ===
                                                    dayDate.getDate();

                                            return (
                                                <button
                                                    key={dayDate.toISOString()}
                                                    type="button"
                                                    disabled={isDisabled}
                                                    onClick={() =>
                                                        setSelectedDate(dayDate)
                                                    }
                                                    className={`rounded-md py-2 text-sm font-semibold transition ${
                                                        isDisabled
                                                            ? "cursor-not-allowed text-gray-300"
                                                            : isSelected
                                                              ? "bg-amber-600 text-white"
                                                              : "text-gray-700 hover:bg-gray-100"
                                                    }`}
                                                >
                                                    {dayNumber}
                                                </button>
                                            );
                                        },
                                    )}
                                </div>

                                <p className="mt-2 text-xs text-gray-500">
                                    Selected:{" "}
                                    {selectedDate.toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="time-range"
                                    className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500"
                                >
                                    Time range
                                </label>
                                <select
                                    id="time-range"
                                    value={selectedTimeRange}
                                    onChange={(event) =>
                                        setSelectedTimeRange(
                                            event.target.value as PickupWindow,
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-gray-400"
                                >
                                    {PICKUP_WINDOWS.map((timeOption) => (
                                        <option
                                            key={timeOption.value}
                                            value={timeOption.value}
                                        >
                                            {timeOption.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ) : null}
                </div>
            </aside>
        </main>
    );
};

export default CustomerPage;
