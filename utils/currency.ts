import { CURRENCY_CODE, CURRENCY_LOCALE } from "./constants";

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(CURRENCY_LOCALE, {
        style: "currency",
        currency: CURRENCY_CODE,
    }).format(amount);
};
