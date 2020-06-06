class DomUpdates {
    constructor(date) {
        this.date = date
    }

    displayAgencyDashboard(travelAgency) {
        // clearTimeout(cycle)
        this.agencyDashboard(travelAgency)
        this.clearInputs()
    }
    
    clearInputs() {
        document.getElementById('username').value = ''
        document.getElementById('password').value = ''
    }
    
    agencyDashboard(travelAgency) {
        document.querySelector('.main').innerHTML = `<article class='agency-dashboard'>
        <section class='requested-trips'></section>
        <section class='travelers-on-trips'></section>
        <section class='search-for-user'></section>
        <section class='income'></section>
        </article>`
        this.requestedTrips()
        this.travelersOnTrips(travelAgency)
        this.searchForUser()
        this.income()
    }

    displayTravelerDashboard(traveler) {
        // clearTimeout(cycle)
        this.travelerDashboard()
        this.clearInputs()
    }

    requestedTrips(travelAgency) {
        document.querySelector('.requested-trips').innerHTML = `<h1>Trips Requested:</h1>`
    }

    travelersOnTrips(travelAgency) {
        document.querySelector('.travelers-on-trips').innerHTML = `<h1>Travelers on trips:</h1>
        <p>${travelAgency.travelersThatAreOnTrips(this.date).length}</p>`
    }

    searchForUser(travelAgency) {
        document.querySelector('.search-for-user').innerHTML = `<h1>Search for Traveler:</h1>`
    }

    income(travelAgency) {
        document.querySelector('.income').innerHTML = `<h1>Total Income:</h1>`
    }

    travelerDashboard(traveler) {
        document.querySelector('.main').innerHTML = `<article class='traveler-dashboard'>
        <section class='all-trips'></section>
        <section class='amount-spent'></section>
        <section class='trip-request'></section>
        <section class='pending-trips'></section>
        </article>`
        this.allTrips(traveler)
        this.amountSpent(traveler)
        this.requestTrip(traveler)
        this.pendingTrips(traveler)
    }

    allTrips(traveler) {
        document.querySelector('.all-trips').innerHTML = 
        `<h1>All Trips:</h1>`
    }

    amountSpent(traveler) {
        document.querySelector('.amount-spent').innerHTML = 
        `<h1>Amount Spent:</h1>`
    }

    requestTrip(traveler) {
        document.querySelector('.trip-request').innerHTML = 
        `<h1>Request a Trip:</h1>`
    }

    pendingTrips(traveler) {
        document.querySelector('.pending-trips').innerHTML = 
        `<h1>Pending Trips:`
    }

    displayError(traveler) {
        debugger
        let form = document.getElementById('form1')
        form.insertAdjacentHTML('afterend', `ERROR`)
        this.clearInputs()
    }

    cycleImages(destinations) {
        let num = Math.random() * (50 - 0)
        let index = Math.round(num)
        document.querySelector('.main').innerHTML = `<header class='welcome-message'><h2>Welcome to Travel Tracker</h2><h3>Your Vacation Awaits!</h3></header>
         <section class='images'><img src="${destinations[index].image}" alt="${destinations[index].image.alt}" class='cycling-images'>
         <p class='main-menu-travel-deal'>Flights to ${destinations[index].destination} for $${destinations[index].estimatedFlightCostPerPerson}.00 with lodging starting at $${destinations[index].estimatedLodgingCostPerDay}.00</p></section>`
    }
}


export default DomUpdates;