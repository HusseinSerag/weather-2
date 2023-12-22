export  async function getInfo(city){
    
    
    const data = fetch(`https://api.weatherapi.com/v1/forecast.json?key=69861d6fcc6846d9b36141044231912&q=${city}&days=3`,{
        mode:'cors'})
    
    let [dataJSON] = await Promise.all([data])
    dataJSON = await dataJSON.json()
    
    return dataJSON
}

export function getLocation(){

    return new Promise((resolve,reject)=>{
        const data = navigator.geolocation.getCurrentPosition(
            position =>{
            
             if(position.coords.accuracy > 150){
                reject(0)
             }
             
               resolve( `${position.coords.latitude},${position.coords.longitude}`)
             
             
                
            },function(){
                
                 reject(0)
            },{
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000
            })
    })

    
}


 export function checkError(input){
    if(input.value.length == 0){
        throw new Error()
    }
 }


export async function getQuoteApi(category){
    const quotes = ["To live is the rarest thing in the world. Most people exist, that is all.","Be the change that you wish to see in the world.","Live as if you were to die tomorrow. Learn as if you were to live forever.","Great minds discuss ideas; average minds discuss events; small minds discuss people."]
    try{
    let quotePromise = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`,{
        mode:"cors",
        headers:{'X-Api-Key':"0RWXO/MPQBT+9dktLMOj+A==GcJczZHfstAyb7Ij"},
        contentType: 'application/json'
    })
    let quotePromiseJSON = await quotePromise.json()
    return quotePromiseJSON[0]
}
catch{
    console.log(Math.floor(Math.random()*4))
    return quotes[Math.floor(Math.random()*4)]
}
}