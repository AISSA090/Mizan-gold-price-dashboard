import { getgoldprices } from './api.js';
import { displayGold , displaySilver , displaytime} from './ui.js';
import { calculateSilverPerGram, calculatePercentage } from './calculator.js';
import { savetolocal } from './storage.js';

const btnactualiser = document.getElementById("button-actualiser");
const savedData = localStorage.getItem("priceHistory");
const savingmetalprice = savedData ? JSON.parse(savedData) : [];

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
    const data = await getgoldprices("MAD");
    const silverprice = calculateSilverPerGram(data.silver_usd_oz, "MAD", data.fx_rates["MAD"]);
    const goldprice = data.xau.price;

    savetolocal(savingmetalprice, "MAD", silverprice, "silver");
    savetolocal(savingmetalprice, "MAD", goldprice, "Gold");

    const silverPercentage = calculatePercentage(savingmetalprice, "silver", "MAD");
    const goldPercentage = calculatePercentage(savingmetalprice, "Gold", "MAD");

    displayGold("MAD", data, goldPercentage);
    displaySilver("MAD", silverprice.toFixed(2), silverPercentage);
    displaytime(data);
}

loadinitialprice();