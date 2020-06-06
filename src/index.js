// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import DomUpdates from './DomUpdates'
import User from './User';
import TravelAgency from './TravelAgency'
import Traveler from './Traveler'
import moment from 'moment'

let cycle
let travelers;
let destinations;
let trips;
let user;
let date;
let domUpdates;
let traveler;
let travelAgency;

//Fetching
travelers = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
  .then(data => data.json())
  .then(data => data.travelers)
  .catch(err => console.log(err.message))

destinations = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  .then(data => data.json())
  .then(data => data.destinations)
  .catch(err => console.log(err.message))

trips = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  .then(data => data.json())
  .then(data => data.trips)
  .catch(err => console.log(err.message))


//PROMISE
Promise.all([travelers, destinations, trips])
  .then(data => {
    travelers = data[0];
    destinations = data[1]
    trips = data[2]
  })
  .then(() => {
    domUpdates = new DomUpdates()
    date = moment().format('YYYY/MM/DD')
    onStartUp(domUpdates, destinations)
  })
  .catch(error => {
    console.log('Something is amiss with promise all', error)
  });
  
  //QuerySelectors
  let logInButton = document.querySelector('.login-button')
  const usernameInput = document.getElementById('username')
  const passwordInput = document.getElementById('password')
  const mainArea = document.querySelector('.main')
  
//Event Listeners 
logInButton.addEventListener('click', logIn)

//Functions
function onStartUp(domUpdates, destinations) {
    domUpdates.cycleImages(destinations)
}

function logIn() {
  debugger
  const usernameArray = usernameInput.value.split('')
  const usernameID = parseInt(usernameArray.splice(8, 10).join('')) - 1
  if(usernameInput.value === 'agency' && passwordInput.value === 'travel2020') {
    // clearTimeout(cycle)
    instantiateTravelAgency()
    // domUpdates.displayAgencyDashboard(travelAgency)
  } else if (usernameID <= 50 && passwordInput.value === 'travel2020') {
    // clearTimeout(cycle)
    instantiateTraveler(usernameID)
  } else {
    domUpdates.displayError()
  }
  event.preventDefault()
}

function instantiateTraveler(usernameID) {
  traveler = new Traveler(travelers, destinations, trips, travelers[usernameID])
  domUpdates.displayTravelerDashboard(traveler)
}

function instantiateTravelAgency() {
  travelAgency = new TravelAgency(travelers, destinations, trips, date)
  domUpdates.displayAgencyDashboard(travelAgency)
}

// function cycleImages(destinations) {
// let num = Math.random() * (50 - 0)
// let index = Math.round(num)
//  mainArea.innerHTML = `<header class='welcome-message'><h2>Welcome to Travel Tracker</h2></header>
//  <section class='cycling-images'><img src="${destinations[index].image}" alt="${destinations[index].image.alt}" class='cycling-images'>
//  <footer>Your Vacation Awaits!</footer></section>`
// }
