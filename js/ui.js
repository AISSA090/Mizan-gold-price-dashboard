export function displayGold(currency,data,percentage){
    const priceElement = document.getElementById("gold-price");
    const currencyElement = document.getElementById("gold-currency");
     currencyElement.textContent=currency
     priceElement.textContent = data.xau.price;
     const goldPercentElement = document.getElementById("Gold-pourcentage"); 

    goldPercentElement.classList.remove("text-green-500", "text-red-500", "up-class", "down-class");

    if (percentage > 0) {
        goldPercentElement.textContent = `▲ +${percentage}%`;
        goldPercentElement.classList.add("text-green-500"); 
    } else if (percentage < 0) {
        goldPercentElement.textContent = `▼ ${percentage}%`;
        goldPercentElement.classList.add("text-red-500");
    } else {
        goldPercentElement.textContent = `0.00%`;
    }

    }
    export function displaySilver(currency,data,percentage){
        const pricesilver=document.getElementById("silver-price")
        const currencysilver=document.getElementById("silver-currency")
      
        currencysilver.textContent=currency
        pricesilver.textContent=data
        const Silverpourcentage = document.getElementById("silver-pourcentage");

        Silverpourcentage.classList.remove("text-green-500", "text-red-500", "up-class", "down-class");

    if (percentage > 0) {
        Silverpourcentage.textContent = `▲ +${percentage}%`;
        Silverpourcentage.classList.add("text-green-500"); 
    } else if (percentage < 0) {
        Silverpourcentage.textContent = `▼ ${percentage}%`;
        Silverpourcentage.classList.add("text-red-500"); 
    } else {
        Silverpourcentage.textContent = `0.00%`;
    }
}
export function displaytime(data){
    const time=document.getElementById("last-update")
    const cleanDate = new Date(data.updated_at).toLocaleString('fr-FR');
    time.textContent=`last updated ${cleanDate}`
}
export function show(status) {
    const loadingBox = document.getElementById("loading-box");
    const successBox = document.getElementById("success-box");
    const errorBox = document.getElementById("error-box");
    const btnActualiser = document.getElementById("button-actualiser");
    loadingBox.classList.add("hidden");
    successBox.classList.add("hidden");
    errorBox.classList.add("hidden");

    if (status === "success") {
        successBox.classList.remove("hidden");
        btnActualiser.disabled = false;
        setTimeout(() => {
            successBox.classList.add("hidden");
        }, 2500);

    } else if (status === "error") {
        errorBox.classList.remove("hidden");
        btnActualiser.disabled = false;

    } else if (status === "loading") {
        loadingBox.classList.remove("hidden");
        btnActualiser.disabled = true;
    }
}