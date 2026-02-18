"use client";

import type { PickupWindow } from "@/types/order";
import { PICKUP_WINDOWS } from "@/utils/constants";

type PickupSelectorProps = {
    value: PickupWindow;
    onChange: (value: PickupWindow) => void;
};

const PickupSelector = ({ value, onChange }: PickupSelectorProps) => {
    return (
        <label className="block text-sm">
            <span className="mb-1 block font-medium">Pickup Time</span>
            <select
                className="w-full rounded-md border px-3 py-2"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value as PickupWindow)
                }
            >
                {PICKUP_WINDOWS.map((windowOption) => (
                    <option key={windowOption.value} value={windowOption.value}>
                        {windowOption.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default PickupSelector;
