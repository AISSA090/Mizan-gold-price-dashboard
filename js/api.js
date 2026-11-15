export async function getgoldprices(currency) {
    const url = `https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("HTTP Error: "+response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(" Error:", error);
        throw error; 
    }
}
export async function getgodhistory() {
   const URL="https://xaus.com/api/v1/history"
   try {
      const response=await fetch(URL);
      if(!response.ok){
         throw new Error ("HTTP error : "+response.status)
      }
      const data = await response.json();
      return data
   } catch (error) {
     throw error
   }
}