// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import DomUpdates from './DomUpdates'
import TravelAgency from './TravelAgency'
import Traveler from './Traveler'
import moment from 'moment'


let travelers;
let destinations;
let trips;
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
    date = moment().format('YYYY/MM/DD')
    domUpdates = new DomUpdates(date)
    onStartUp(domUpdates, destinations)
  })
  .catch(error => {
    console.log('Something is amiss with promise all', error)
  });
  
  //QuerySelectors
  const logInButton = document.querySelector('.login-button')
  const passwordInput = document.getElementById('password')
  const mainArea = document.querySelector('.main')
  const sidebar = document.querySelector('.side-bar')
  const usernameInput = document.getElementById('username')
  
  
  //Event Listeners 
  logInButton.addEventListener('click', logIn)
  mainArea.addEventListener('click', agencyDashboardConditionals)
  sidebar.addEventListener('click', sideBarConditionals)
  mainArea.addEventListener('click', travelerDashBoardConditionals)
  
  
  //Functions
  function onStartUp(domUpdates, destinations) {
    domUpdates.cycleImages(destinations)
  }
  
  function logIn() {
  const usernameArray = usernameInput.value.split('')
  const usernameID = parseInt(usernameArray.splice(8, 10).join('')) - 1
  if (usernameInput.value === 'agency' && passwordInput.value === 'travel2020') {
    instantiateTravelAgency()
    domUpdates.logOut()
  } else if (usernameID <= 50 && passwordInput.value === 'travel2020') {
    instantiateTraveler(usernameID, date)
    domUpdates.logOut()
  } else {
    domUpdates.clearInputs()
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

function agencyDashboardConditionals(event) {
  if (event.target.classList.contains('search-button')) {
    domUpdates.displaySearchUser(travelAgency)
  }
  if (event.target.classList.contains('approve-trip-button')) {
    travelAgency.approveTrip(parseInt(event.target.value), travelAgency, domUpdates)
  }
  if (event.target.classList.contains('deny-trip-button')) {
    travelAgency.deleteTrip(parseInt(event.target.value), travelAgency, domUpdates)
  }
} 

function travelerDashBoardConditionals() {
  let startDate = document.getElementById('trip-start-date')
  let destinationName = document.getElementById('vacation-destination')
  let numDays = document.getElementById('number-of-days')
  let numTravelers = document.getElementById('num-travelers')
  if (event.target.classList.contains('estimated-cost-button')) {
    domUpdates.estimatedCost(traveler, numTravelers.value, numDays.value, destinationName.value)
  }
  if (event.target.classList.contains('book-trip-button')) {
    let locationID = parseInt(destinationName.value)
    let intTravelers = parseInt(numTravelers.value)
    let intDays = parseInt(numDays.value)
    let firstDays = moment(startDate.value).format('YYYY/MM/DD')
    traveler.makeTripRequest(intTravelers, firstDays, intDays, locationID, traveler, domUpdates)
  }
  event.preventDefault()
}

function sideBarConditionals(event) {
  if (event.target.classList.contains('logout')) {
    onStartUp(domUpdates, destinations)
    document.querySelector('.log-in').innerHTML = `<h3>Refresh Page to log back in!</h3>`
  }
}



