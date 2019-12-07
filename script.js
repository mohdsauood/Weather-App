
window.addEventListener('load',()=>
{

//get day,hour,minute,pm elements
let printDay=document.querySelector('.time h4');
let printHour=document.querySelector('.hour');
let printMinutes=document.querySelector('.minute');
let printAmpm=document.querySelector('.amorpm');

//set date object and get day hour minute pm
let date = new Date();
let dayNum = date.getDay();
let hours = date.getHours();
let minutes = date.getMinutes();

//set Day
switch (dayNum) {
  case 0:
    printDay.innerHTML = "Sunday";
    break;
  case 1:
  printDay.innerHTML = "Monday";
    break;
  case 2:
   printDay.innerHTML = "Tuesday";
    break;
  case 3:
  printDay.innerHTML = "Wednesday";
    break;
  case 4:
  printDay.innerHTML  = "Thursday";
    break;
  case 5:
  printDay.innerHTML = "Friday";
    break;
  case 6:
   printDay.innerHTML  = "Saturday";
}
//set hours
function setTime()
{
if(hours>12)
{
  printHour.innerHTML=hours-12;
  printMinutes.innerHTML=minutes;
  printAmpm.innerHTML="pm";
}
else {
  printHour.innerHTML=hours;
  printMinutes.innerHTML=minutes;
  printAmpm.innerHTML="am";
}
}

setTime();

//setting lat and longitude
const description=document.querySelector('.description');
const temperaturee=document.querySelector('.temperature h2');
const location=document.querySelector('.location');
const hicon=document.querySelector('.icon canvas');
const measurementButton=document.querySelector('.temperature');

const measurement=document.querySelector('.temperature span');
if(navigator.geolocation)
{
  navigator.geolocation.getCurrentPosition(position =>
    {
    const long = position.coords.longitude;
    const lat = position.coords.latitude;
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api=`${proxy}https://api.darksky.net/forecast/263e85b0709ada62033873f288aec627/${lat},${long}`;

    fetch(api)
      .then(response =>
      {
        return response.json();
      })
      .then(data =>
      {
        const{temperature , summary, icon} = data.currently;
        //set DOM elements
        temperaturee.textContent=temperature;
        description.textContent=summary;
        location.textContent=data.timezone;

        (temperaturee - 32) * (5/9);
        // set icon
        setIcons(icon,hicon);

        //convert to celcius

        measurementButton.addEventListener('click',()=>{
          if(measurement.textContent === "F")
          {
            measurement.textContent = "C";
            temperaturee.textContent=Math.floor((temperature - 32) * (5/9));
          }
          else
          {
            measurement.textContent = "F";
            temperaturee.textContent=temperature;
          }
        })
      });
  });

}

function setIcons(icon,iconID)
{
  const skycons = new Skycons({color:'white'});
  const currentIcon = icon.replace(/-/g,"_").toUpperCase();
  skycons.play();
  return skycons.set(iconID,Skycons[currentIcon]);
}





});
