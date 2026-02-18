import type { PickupWindow } from "@/types/order";

export const APP_NAME = "Yene Bakery";
export const CURRENCY_CODE = "USD";
export const CURRENCY_LOCALE = "en-US";

export const PICKUP_WINDOWS: Array<{ label: string; value: PickupWindow }> = [
    { label: "Morning (8:00 - 11:00)", value: "MORNING" },
    { label: "Afternoon (12:00 - 15:00)", value: "AFTERNOON" },
    { label: "Evening (16:00 - 19:00)", value: "EVENING" },
];
