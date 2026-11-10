export function displayGold(currency,data){
    const priceElement = document.getElementById("gold-price");
    const currencyElement = document.getElementById("gold-currency");
     currencyElement.textContent=currency
     priceElement.textContent = data.xau.price;

}