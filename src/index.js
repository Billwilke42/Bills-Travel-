// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// import DomUpdates from './domUpdates'
import User from './User';

let travelers;
let destinations;
let trips;
let user;
// const domUpdates = new DomUpdates()

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
    user = new User(travelers, destinations, trips)
    onStartUp()
  })
  .catch(error => {
    console.log('Something is amiss with promise all', error)
  });
  
  //QuerySelectors
  let logInButton = document.querySelector('.login-button')
  const usernameInput = document.getElementById('username')
  const passwordInput = document.getElementById('password')
  
//Event Listeners 
logInButton.addEventListener('click', logIn)
//Functions
function onStartUp() {
    let counter = 0;
    // cycleImages(destinations, counter)
}

function cycleImages(destinations, counter) {
    counter++
    if(counter === destinations.length + 1) {
        counter = 0
    }
    console.log(destinations[counter])
    let mainArea = document.querySelector('.main')
    mainArea.innerHTML = `<header class='welcome-message'><h2>Welcome to Travel Tracker</h2></header>
    <section class='cycling-images'><img src="${destinations[counter].image}" alt="destination-image" class='cycling-images'>
    <footer>Your Vacation Awaits!</footer></section>`
    setTimeout(cycleImages, 3000, destinations, counter);
}

function logIn(event) {
  debugger
  const usernameArray = usernameInput.value.split('')
  const usernameID = usernameArray.splice(8, 10).join('')
  if(usernameInput.value === 'agency' && passwordInput.value === 'travel2020') {
    displayAgencyDashboard()
  } else if (usernameID <= 50 && passwordInput.value === 'travel2020') {
    displayTravelerDashboard()
  } else {
    displayError()
  }
  event.preventDefault()
}

function displayAgencyDashboard() {
  let mainArea = document.querySelector('.main')
  mainArea.innerHTML = `<p>hey travel agent</p>`
  usernameInput.value = ''
  passwordInput.value = ''
}

function displayTravelerDashboard() {
  let mainArea = document.querySelector('.main')
  mainArea.innerHTML = `<p>hey traveler</p>`
  usernameInput.value = ''
  passwordInput.value = ''
}

function displayError() {
  debugger
  let form = document.getElementById('form1')
  form.insertAdjacentHTML('afterend', `ERROR`)
  usernameInput.value = ''
  passwordInput.value = ''
}

