class DomUpdates {
    constructor() {
        this.mainArea = document.querySelector('.main')
        this.usernameInput = document.getElementById('username')
        this.passwordInput = document.getElementById('password')
        this.cycle = null;
    }
    displayAgencyDashboard() {
        // clearTimeout(cycle)
        this.agencyDashboard()
        this.usernameInput.value = ''
        this.passwordInput.value = ''
    }
    
    agencyDashboard() {
    
        this.mainArea.innerHTML = `<article class='agency-dashboard'>
        <section class='requested-trips'></section>
        <section class='travelers-on-trips'></section>
        <section class='search-for-user'></section>
        <section class='income'></section>
        </article>`
        this.requestedTrips()
        this.travelersOnTrips()
        this.searchForUser()
        this.income()
    }

    displayTravelerDashboard() {
        // clearTimeout(cycle)
        this.travelerDashboard()
        this.usernameInput.value = ''
        this.passwordInput.value = ''
    }

    requestedTrips() {
        let tripsRequestedForm = document.querySelector('.requested-trips')
        tripsRequestedForm.innerHTML = `<h1>Trips Requested:</h1>`
    }

    travelersOnTrips() {
        let travelersOnTripsForm = document.querySelector('.travelers-on-trips')
        travelersOnTripsForm.innerHTML = `<h1>Travelers on trips:</h1>`
    }

    searchForUser() {
        let searchForUserForm = document.querySelector('.search-for-user')
        searchForUserForm.innerHTML = `<h1>Search for Traveler:</h1>`
    }

    income() {
        let incomeForm = document.querySelector('.income')
        incomeForm.innerHTML = `<h1>Total Income:</h1>`
    }

    travelerDashboard() {
        this.mainArea.innerHTML = `<article class='traveler-dashboard'>
        <section class='all-trips'></section>
        <section class='amount-spent'></section>
        <section class='trip-request'></section>
        <section class='pending-trips'></section>
        </article>`
        this.allTrips()
        this.amountSpent()
        this.requestTrip()
        this.pendingTrips()
    }

    allTrips() {
        let allTripsForm = document.querySelector('.all-trips')
        allTripsForm.innerHTML = `<h1>All Trips:</h1>`
    }

    amountSpent() {
        let amountSpentForm = document.querySelector('.amount-spent')
        amountSpentForm.innerHTML = `<h1>Amount Spent:</h1>`
    }

    requestTrip() {
        let requestTripForm = document.querySelector('.trip-request')
        requestTripForm.innerHTML = `<h1>Request a Trip:</h1>`
    }

    pendingTrips() {
        let pendingTripsForm = document.querySelector('.pending-trips')
        pendingTripsForm.innerHTML = `<h1>Pending Trips:`
    }

    displayError() {
        debugger
        let form = document.getElementById('form1')
        form.insertAdjacentHTML('afterend', `ERROR`)
        usernameInput.value = ''
        passwordInput.value = ''
    }

    cycleImages(destinations, counter, mainArea) {
         debugger
        counter++
        if(counter === destinations.length + 1) {
            counter = 0
        }
        mainArea.innerHTML = `<header class='welcome-message'><h2>Welcome to Travel Tracker</h2></header>
        <section class='cycling-images'><img src="${destinations[counter].image}" alt="destination-image" class='cycling-images'>
        <footer>Your Vacation Awaits!</footer></section>`
        setInterval(this.cycleImages, 2000, destinations, counter, mainArea);
    }
}


export default DomUpdates;