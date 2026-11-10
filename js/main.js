import { getgoldprices } from './api.js';
import { displayGold , displaySilver} from './ui.js';
import { calculateSilverPerGram } from './calculator.js';
 const btnactualiser=document.getElementById("button-actualiser")


  btnactualiser.addEventListener('click',async function(){
      const currency=document.getElementById("currency").value;
      const data = await getgoldprices(currency);
      const silverprice=calculateSilverPerGram(data.silver_usd_oz, currency, data.fx_rates[currency]);
    if(currency==="MAD"){
        displayGold("MAD",data)
        displaySilver("MAD",silverprice.toFixed(2))
    }else if(currency==="USD"){
        displayGold("USD",data)
        displaySilver("USD",silverprice.toFixed(2))
    }else if (currency==="EUR"){
        displayGold("EUR",data)
        displaySilver("EUR",silverprice.toFixed(2))
    }
  })
  async function loadinitialprice() {
    const data = await getgoldprices("MAD");
    const silverprice=calculateSilverPerGram(data.silver_usd_oz, currency, data.fx_rates["MAD"]);
    displayGold("MAD",data)
    displaySilver("MAD",silverprice.toFixed(2));
  }
  loadinitialprice();