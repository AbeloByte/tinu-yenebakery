"use client";

type QuantitySelectorProps = {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
};

const QuantitySelector = ({
    quantity,
    onIncrease,
    onDecrease,
}: QuantitySelectorProps) => {
    return (
        <div className="inline-flex items-center rounded-md border">
            <button
                type="button"
                onClick={onDecrease}
                className="px-3 py-1 text-sm"
                aria-label="Decrease quantity"
            >
                -
            </button>
            <span className="min-w-8 px-2 text-center text-sm">{quantity}</span>
            <button
                type="button"
                onClick={onIncrease}
                className="px-3 py-1 text-sm"
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
