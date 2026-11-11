export function savetolocal(array, currency, price, metal) {

    const metalHistory = array.filter(item => item.metal === metal && item.currency === currency);
   
    if (metalHistory.length > 0) {
        const lastPrice = metalHistory[metalHistory.length - 1].price;
        if (lastPrice === price) {
          
            return array;
        }
    }

    const object = {
        metal: metal,
        price: price,
        currency: currency,
        date: new Date().toISOString()
    };
    
    array.push(object);
    localStorage.setItem("priceHistory", JSON.stringify(array));
    return array;
}
