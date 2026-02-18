"use client";

import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/currency";
import Image from "next/image";

type ProductCardProps = {
    product: Product;
    onAdd: (product: Product) => void;
};

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
    return (
        <article className="border  p-4 shadow-sm bg-amber-50 ">
            <div>
                {/* Product image */}
                <div className="aspect-square w-3xs overflow-hidden rounded-lg">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={140}
                        height={140}
                        className="h-full w-40 object-cover object-center"
                    />
                </div>
            </div>

            <h3 className="text-base font-medium">{product.name}</h3>
            <p className="mt-2 text-sm text-gray-600">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold">
                    {formatCurrency(product.price)}
                </span>
                <button
                    type="button"
                    className="rounded-md bg-black px-3 py-1.5 text-sm text-white cursor-pointer hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                    onClick={() => onAdd(product)}
                    disabled={!product.isAvailable}
                >
                    {product.isAvailable ? "Add" : "Unavailable"}
                </button>
            </div>
        </article>
    );
};

export default ProductCard;
