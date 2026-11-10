export function calculateSilverPerGram(silverUsdOz, currency, fxRates) {
    const silverUsdGram = silverUsdOz / 31.1035;
    if (currency === "USD") {
        return silverUsdGram;
    }
    const exchangeRate = fxRates;
    return silverUsdGram * exchangeRate;
}