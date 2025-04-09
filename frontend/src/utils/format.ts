export const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
};

export const formatAmount = (
    amount: number | string,
    symbol: string,
    isPrefix: boolean
): string => (isPrefix ? `${symbol}${amount.toLocaleString()}` : `${amount.toLocaleString()}${symbol}`);

export const getFormattedAmount = (
    amount: number,
    symbol: string,
    isPrefix: boolean
): string => {
    const values = [
        { value: 1_000_000_000_000, suffix: "T" },
        { value: 1_000_000_000, suffix: "B" },
        { value: 1_000_000, suffix: "M" },
        { value: 1_000, suffix: "k" },
    ];

    for (const { value, suffix } of values) {
        if (amount >= value) {
            if (amount === value) {
                return formatAmount(amount, symbol, isPrefix);
            }
            return formatAmount((amount / value).toFixed(1) + suffix, symbol, isPrefix);
        }
    }

    return formatAmount(amount, symbol, isPrefix);
};

export const formatBudget = (
    budget: number,
    symbol: string,
    isPrefix: boolean
): string => {
    return formatAmount(budget.toLocaleString(), symbol, isPrefix);
}