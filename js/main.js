import { getgoldprices } from './api.js';
import { displayGold , displaySilver , displaytime} from './ui.js';
import { calculateSilverPerGram, calculatePercentage } from './calculator.js';
import { savetolocal } from './storage.js';

const btnactualiser = document.getElementById("button-actualiser");
const savedData = localStorage.getItem("priceHistory");
const savingmetalprice = savedData ? JSON.parse(savedData) : [];
const choice=document.getElementById("currency")

btnactualiser.addEventListener('click', async function() {
    const currency = document.getElementById("currency").value;
    const data = await getgoldprices(currency);
    const silverprice = calculateSilverPerGram(data.silver_usd_oz, currency, data.fx_rates[currency]);
    const goldprice = data.xau.price;

    savetolocal(savingmetalprice, currency, silverprice, "silver");
    savetolocal(savingmetalprice, currency, goldprice, "Gold");

    const silverPercentage = calculatePercentage(savingmetalprice, "silver", currency);
    const goldPercentage = calculatePercentage(savingmetalprice, "Gold", currency);

    if (currency === "MAD") {
        displayGold("MAD", data, goldPercentage);
        displaySilver("MAD", silverprice.toFixed(2), silverPercentage);
        displaytime(data);
    } else if (currency === "USD") {
        displayGold("USD", data, goldPercentage);
        displaySilver("USD", silverprice.toFixed(2), silverPercentage);
        displaytime(data);
    } else if (currency === "EUR") {
        displayGold("EUR", data, goldPercentage);
        displaySilver("EUR", silverprice.toFixed(2), silverPercentage);
        displaytime(data);
    }
});

async function loadinitialprice() {
    let savedCurrency = "MAD"; 
    if (savingmetalprice.length > 0) {
        savedCurrency = savingmetalprice[savingmetalprice.length - 1].currency;
    }
    document.getElementById("currency").value = savedCurrency;

    const data = await getgoldprices(savedCurrency);
    const silverprice = calculateSilverPerGram(data.silver_usd_oz, savedCurrency, data.fx_rates[savedCurrency]);
    const goldprice = data.xau.price;

    const silverPercentage = calculatePercentage(savingmetalprice, "silver", savedCurrency, silverprice);
    const goldPercentage = calculatePercentage(savingmetalprice, "Gold", savedCurrency, goldprice);

    savetolocal(savingmetalprice, savedCurrency, silverprice, "silver");
    savetolocal(savingmetalprice, savedCurrency, goldprice, "Gold");

    displayGold(savedCurrency, data, goldPercentage);
    displaySilver(savedCurrency, silverprice.toFixed(2), silverPercentage);
    displaytime(data);
}
choice.addEventListener('change',async function(){
  const currency=document.getElementById("currency").value;
  const data = await getgoldprices(currency);
 const silverprice = calculateSilverPerGram(data.silver_usd_oz, currency, data.fx_rates[currency]);
  const goldprice = data.xau.price;
  const silverPercentage = calculatePercentage(savingmetalprice, "silver", currency, silverprice);
   const goldPercentage = calculatePercentage(savingmetalprice, "Gold", currency, goldprice);
    displayGold(currency, data, goldPercentage);
    displaySilver(currency, silverprice.toFixed(2), silverPercentage);
    displaytime(data);
})
loadinitialprice();
