
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
  printMinutes.innerHTML="0"+minutes;
  printAmpm.innerHTML="pm";
}
else {
  printHour.innerHTML=hours;
  printMinutes.innerHTML="0"+minutes;
  printAmpm.innerHTML="am";
}
}

setTime();

//setting lat and longitude
const description=document.querySelector('.description');
const temperaturee=document.querySelector('.temperature h2');
const location=document.querySelector('.location');
const icon=document.querySelector('.icon canvas');

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
        const{temperature , summary} = data.currently;
        //set DOM elements
        temperaturee.textContent=temperature;
        description.textContent=summary;
        location.textContent=data.timezone;
      });
  });
}







});
