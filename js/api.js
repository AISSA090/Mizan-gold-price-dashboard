 export async function getgoldprices(currency){
    let Url=`https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`
    const response=await fetch (Url)
    const data =await response.json()
    return data
 }