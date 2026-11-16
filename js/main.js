import { getgoldprices ,getgodhistory } from './api.js';
import { displayGold , displaySilver , displaytime , show} from './ui.js';
import { calculateSilverPerGram, calculatePercentage ,calculatepricepergrame} from './calculator.js';
import { savetolocal } from './storage.js';

const btnactualiser = document.getElementById("button-actualiser");
const savedData = localStorage.getItem("priceHistory");
const savingmetalprice = savedData ? JSON.parse(savedData) : [];
const choice=document.getElementById("currency")

btnactualiser.addEventListener('click', async function() {
    const currency = document.getElementById("currency").value;
    try {
         show("loading")
            const data = await getgoldprices(currency);
            
                const silverprice = calculateSilverPerGram(data.silver_usd_oz, currency, data.fx_rates[currency]);
                const goldprice = data.xau.price;
            
                
                const silverPercentage = calculatePercentage(savingmetalprice, "silver", currency);
                const goldPercentage = calculatePercentage(savingmetalprice, "Gold", currency);
                
                savetolocal(savingmetalprice, currency, silverprice, "silver");
                savetolocal(savingmetalprice, currency, goldprice, "Gold");
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
                show("success")
    } catch (error) {
       
        show("error")
        
    }
});

async function loadinitialprice() {
  const savedCurrency =localStorage.getItem("selectedCurrency") || "MAD";
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
  show("loading")
  const data = await getgoldprices(currency);
  show("success")
 const silverprice = calculateSilverPerGram(data.silver_usd_oz, currency, data.fx_rates[currency]);
  const goldprice = data.xau.price;
  const silverPercentage = calculatePercentage(savingmetalprice, "silver", currency, silverprice);
 const goldPercentage = calculatePercentage(savingmetalprice, "Gold", currency, goldprice);
  localStorage.setItem("selectedCurrency", currency);
    savetolocal(savingmetalprice, currency, silverprice, "silver");
    savetolocal(savingmetalprice, currency, goldprice, "Gold");
    displayGold(currency, data, goldPercentage);
    displaySilver(currency, silverprice.toFixed(2), silverPercentage);
    displaytime(data);
})
const btn7days=document.getElementById("btn-7days")
const btn30days=document.getElementById("btn-30days")
let goldchart=null

function generatechart(date,prices,currency){
    const ctx = document.getElementById('goldChart').getContext('2d');
    if(goldchart){
        goldchart.destroy()
    }
    
      goldchart=new Chart(ctx, {
    type: 'line',
    data: {
        labels: date,
        datasets: [{
            label: "Gold Price ("+currency+"/g)",
            data: prices,
            borderColor: '#D4AF37',
            backgroundColor: 'rgba(212, 175, 55, 0.15)',
            borderWidth: 2,
            tension: 0.3,
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                grid: { display: false }
            }
        }
    }

});
    }
btn30days.addEventListener('click',async function () {
    const currency = document.getElementById("currency").value;
    try {
        show("loading")
        const data= await  getgodhistory();
        const goldData = await getgoldprices(currency);
        const changerate=goldData.fx_rates[currency]
        const last30Days=data.points.slice(-30);
        const prices = last30Days.map(point => (point.c / 31.1035) * changerate);
        const date =last30Days.map(n=>(n.d))
        generatechart(date,prices,currency)
        show("success")
    } catch (error) {
         show("error")
    }
    
})
btn7days.addEventListener('click',async function () {
    const currency = document.getElementById("currency").value;
    try {
        show("loading")
        const data= await  getgodhistory();
        const goldData = await getgoldprices(currency);
        const changerate=goldData.fx_rates[currency]
        const last30Days=data.points.slice(-7);
        const prices = last30Days.map(point => (point.c / 31.1035) * changerate);
        const date =last30Days.map(n=>(n.d))
        generatechart(date,prices,currency)
        show("success")
        
    } catch (error) {
         show("error")
    }
    
})
const poids=document.getElementById("weight")
const priceestimation=document.getElementById("estimated-price")
poids.addEventListener('input',async function(){
    const poids=document.getElementById("weight").value;
    const metaltype=document.getElementById("type-of-metal").value;
    const currency = document.getElementById("currency").value;
    if (poids==="" || parseFloat(poids) <= 0){
        priceestimation.textContent="---"
        return ;
    }
     if(metaltype==="gold") {
        try {
            const data=await  getgoldprices(currency);
            const goldprice = data.xau.price;
            priceestimation.textContent=calculatepricepergrame(goldprice,poids).toFixed(2)+currency
            show("success")
        } catch (error) {
              show("error")
        }
        
     }else{
          try {
            const data=await  getgoldprices(currency);
            const changerate=data.fx_rates[currency]
            const silverprice = calculateSilverPerGram(data.silver_usd_oz, currency, changerate);
            priceestimation.textContent=calculatepricepergrame(silverprice.toFixed(2),poids)+currency
            show("success")
        } catch (error) {
               show("error")
        }
     }
    
})


loadinitialprice();
btn7days.click();
btnactualiser.click();
