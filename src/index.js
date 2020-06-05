// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import domUpdates from './domUpdates'
import User from './User';
import TravelAgency from './TravelAgency'
import Traveler from './Traveler'
import moment from 'moment'

let travelers;
let destinations;
let trips;
let user;
let date;

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
  .then(data => data.recipeData)
  .catch(err => console.log(err.message))


//PROMISE
Promise.all([travelers, destinations, trips])
  .then(data => {
    travelers = data[0];
    destinations = data[1]
    trips = data[2]
  })
  .then(() => {
    date = moment().format('YYYY/MM/DD')
    console.log(date)
    user = new User(travelers, destinations, trips)
    onStartUp(destinations)
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
logInButton.addEventListener('click', domUpdates.logIn)

//Functions
function onStartUp(destinations) {
    let counter = 0;
    // domUpdates.cycleImages(destinations, counter)
}

function instantiateTravelAgency() {
  let travelAgency = new TravelAgency(travelers, destinations, trips, date)
}
