import { getgoldprices } from './api.js';
import { displayGold } from './ui.js';
 const btnactualiser=document.getElementById("button-actualiser")


  btnactualiser.addEventListener('click',async function(){
      const currency=document.getElementById("currency").value;
      const data = await getgoldprices(currency);
    if(currency==="MAD"){
        displayGold("MAD",data)
    }else if(currency==="USD"){
        displayGold("USD",data)
    }else if (currency==="EUR"){
        displayGold("EUR",data)
    }
  })
  async function loadinitialprice() {
    const data = await getgoldprices("MAD");
    displayGold("MAD",data)
    
  }
  loadinitialprice();