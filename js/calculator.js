export function calculateSilverPerGram(silverUsdOz, currency, fxRates) {
    const silverUsdGram = silverUsdOz / 31.1035;
    if (currency === "USD") {
        return silverUsdGram;
    }
    const exchangeRate = fxRates;
    return silverUsdGram * exchangeRate;
}
export function calculatePercentage(array, metal, currency) {
    const metalHistory = array.filter(item => item.metal === metal && item.currency === currency);

    if (metalHistory.length < 2) {
        return 0;
    }

    const newPrice = metalHistory[metalHistory.length - 1].price;
    const oldPrice = metalHistory[metalHistory.length - 2].price;

    const percentage = ((newPrice - oldPrice) / oldPrice) * 100;

    return percentage.toFixed(2);
}