import searchPhoto from '../photos/magnify.png'
import cancelIcon from '../photos/alpha-x-circle.png'
import Loading from '../photos/giphy.gif'
import backImg from '../photos/arrow-left.png'
import nextImg from '../photos/arrow-right.png'
import sunrise from '../photos/weather-sunset-up.png'
import sunset from '../photos/weather-sunset-down.png'
import moonrise from '../photos/weather-night.png'
import moonset from '../photos/moon-new.png'

export const main = document.querySelector('.main-container')
const loading = document.querySelector('.loading')
const loadingImg = document.querySelector('.loadImg img')




export function loadIcons(){
const searchImg = document.querySelector('.searchImg')
const CancelImg = document.querySelector('.cancelImg')
const back = document.querySelector('.controls .back img')
const next = document.querySelector('.controls .next img')
const sunriseDiv = document.querySelector('.information-container img.sun-rise')
const sunsetDiv = document.querySelector('.information-container img.sunset')
const moonsetDiv = document.querySelector('.information-container img.moonrise')
const moonriseDiv = document.querySelector('.information-container img.moonset')
searchImg.src = searchPhoto
CancelImg.src = cancelIcon
sunriseDiv.src = sunrise
sunsetDiv.src = sunset
moonsetDiv.src = moonset
moonriseDiv.src = moonrise
back.src = backImg
next.src = nextImg
}

const sidebar = document.querySelector('.sidebar')
export function mainImage(url){
const main = sidebar.querySelector('.main .mainImg')
main.src = url
}


const mainNumber = sidebar.querySelector('.main .mainDegree .number-container[class$=number]')
    const minDegree = sidebar.querySelector('.main .mainDegree .number-container[class$=min]')
    const maxDegree = sidebar.querySelector('.main .mainDegree .number-container[class$=max]')

 function mainDegree(currentDegree,Degree = 'C'){
   
    
    const text = mainNumber.querySelector('.number')
    
    minDegree.classList.add('not-active')
    maxDegree.classList.add('not-active')
    mainNumber.classList.remove('not-active')

    const degree = mainNumber.querySelector('.degreeType')
    degree.textContent = Degree
    text.textContent = currentDegree
}
 function mainFutureDegree(min , max , Degree = 'C'){
    
    
    minDegree.classList.remove('not-active')
    maxDegree.classList.remove('not-active')
    mainNumber.classList.add('not-active')
    let maxNum = maxDegree.querySelector('.number-max')
    let minNum = minDegree.querySelector('.number-min')

    const minDegreeType = minDegree.querySelector('.degreeType')
    const maxDegreeType = maxDegree.querySelector('.degreeType')
    minDegreeType.textContent = Degree
    maxDegreeType.textContent = Degree
    minNum.textContent = min
    maxNum.textContent = max
 }
 function CurrentDay(time){
    const timeDiv = sidebar.querySelector('.main .mainTime .day')
    
    const options = { 
        weekday: "long",
  month: "long",
  day: "numeric",
    };
    let d = new Date(time)
timeDiv.textContent = `${new Intl.DateTimeFormat("en-US", options).format(d)} `;

}

const selection = main.querySelectorAll('.header .selection div')

export function RenderSelectedDate(data){
let newpic = data.day.condition.icon.replace('64x64','128x128')
mainImage(newpic)
mainFutureDegree(data.day.mintemp_c , data.day.maxtemp_c)
renderAstroOptions(data.astro)
let d = new Date(data.date)

CurrentDay(d)
    

}
export function RenderToday(data){
    let newpic = data.current.condition.icon.replace('64x64','128x128')
mainImage(newpic)
mainDegree(data.current.temp_c)
renderAstroOptions(data.forecast.forecastday[0].astro)
let d = new Date(data.current.last_updated)
CurrentDay(d)
console.log(data)
}

function renderAstroOptions(data){
const data1 = document.querySelector('.information-container .info-div:nth-of-type(1) .name')
const data2 = document.querySelector('.information-container .info-div:nth-of-type(2) .name')
const data3 = document.querySelector('.information-container .info-div:nth-of-type(3) .name')
const data4 = document.querySelector('.information-container .info-div:nth-of-type(4) .name')
data1.textContent = data.sunrise
data2.textContent = data.sunset
data3.textContent = data.moonrise
data4.textContent = data.moonset

}
export function load(){
    loadingImg.src = Loading
    loading.classList.add('active')
}
export function unload(){
    loading.classList.remove('active')
}

 function nextFn(n,length,displayDiv,points){
return pointsMove(n,length,displayDiv,points)
}
 function backFn(n,length,displayDiv,points){
    return pointsMove(n,length,displayDiv,points)
}
function pointsMove(number , length,displayDiv,points){
    const moving = document.querySelector('.moving-points')
    if(number > length -1 ){
        number = 0
    }
    else if(number < 0 ){
        number = length-1
    }
    for(let i = 0 ; i < length ; i++){
        displayDiv.classList.remove(`turn-${i}`)
    }
    for(let i = 0 ; i<length ; i++){
        points[i].classList.remove('selected')
    }
    for(let i = 0 ; i<length ; i++){
        moving.classList.remove(`turn-${i}`)
    }
    
    points[number].classList.add('selected')
    displayDiv.classList.add(`turn-${number}`)
    moving.classList.add(`turn-${number}`)
    return number
}


export function loadCaoursel(start=0){
    const points = document.querySelectorAll('.points-container .points')
    const next = document.querySelector('.controls .next')
    const back  = document.querySelector('.controls .back')
    
    const slider = document.querySelector('.carousel-container .slides')
    let currentPoint = start
    points[start].classList.add('selected')
    for(let i = 0 ; i < points.length ; i++){
        
        points[i].addEventListener('click',()=>{
            currentPoint = i
            pointsMove(i,points.length,slider,points)
        })
    }
    next.addEventListener('click',()=>{
        
        currentPoint = nextFn(currentPoint+1 , points.length,slider,points)
        
    })
    
    back.addEventListener('click',()=>{
       
        currentPoint =  backFn(currentPoint - 1 , points.length,slider , points)
        
    })
}


export function setCity(data){
    const container = sidebar.querySelector('.city-container')
    const cityName = container.querySelector('.name')
    const countryName = container.querySelector('.countryName')
    cityName.textContent = `${data.location.name},`
    countryName.textContent = data.location.country
}


