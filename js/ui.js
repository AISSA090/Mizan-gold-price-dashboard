export function displayGold(currency,data){
    const priceElement = document.getElementById("gold-price");
    const currencyElement = document.getElementById("gold-currency");
     currencyElement.textContent=currency
     priceElement.textContent = data.xau.price;

}
export function displaySilver(currency,data){
    const pricesilver=document.getElementById("silver-price")
    const currencysilver=document.getElementById("silver-currency")
    currencysilver.textContent=currency
    pricesilver.textContent=data
}
export function displaytime(data){
    const time=document.getElementById("last-update")
    const cleanDate = new Date(data.updated_at).toLocaleString('fr-FR');
    time.textContent=`last updated ${cleanDate}`
}