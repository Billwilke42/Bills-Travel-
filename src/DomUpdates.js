import moment from 'moment'

class DomUpdates {
    constructor(date) {
        this.date = date
    }

    displayAgencyDashboard(travelAgency, counter) {
        this.agencyDashboard(travelAgency, counter)
        this.clearInputs()
    }
    
    clearInputs() {
        document.getElementById('username').value = ''
        document.getElementById('password').value = ''
    }
    
    agencyDashboard(travelAgency) {
        document.querySelector('.main').innerHTML = `<article class='agency-dashboard'>
        <section class='requested-trips scrollable'></section>
        <section class='travelers-on-trips'></section>
        <section class='search-for-user scrollable'></section>
        <section class='income'></section>
        </article>`
        this.requestedTrips(travelAgency, travelAgency.requestedTrips)
        this.travelersOnTrips(travelAgency)
        this.searchForUser(travelAgency)
        this.income(travelAgency)
    }

    displayTravelerDashboard(traveler) {
        this.travelerDashboard(traveler)
        this.clearInputs()
    }

    requestedTrips(travelAgency, requestedTrips) {
        console.log('requestTrips', requestedTrips)
        // let requestedTrips = travelAgency.requestedTrips
        let requested = requestedTrips.map(trip => {
           return `
            <section class='pending-trip-card'>
            <form for=${trip.id}>
            <p class='requested-trip-text'>
            <p class='key'>Trip ID:</p> ${trip.id}
            <p class='key'>Traveler:</p>${travelAgency.searchForUserViaID(trip.userID)}
            <p class='key'>Destination:</p> ${travelAgency.searchForDestination(trip.destinationID)}
            <p class='key'>Start Date:</p> ${trip.date}
            <p class='key'>Duration:</p> ${trip.duration} days.
            </p>
            <button type='submit' class='approve-trip-button' form='${trip.id}' value='${trip.id}'>Approve</button>
            <button type='submit' class='deny-trip-button' value='${trip.id}'>Deny</button>
            </section>`
        }).join(' ')
            document.querySelector('.requested-trips').innerHTML = `<h1>Trips Requested:</h1> ${requested}`
    }

    travelersOnTrips(travelAgency) {
        document.querySelector('.travelers-on-trips').innerHTML = `<h1>Travelers on trips:</h1>
        <p>We have ${travelAgency.travelersThatAreOnTrips(this.date).length} travelers vacationing today.<br>
        They are ${travelAgency.travelersThatAreOnTrips(this.date).map(trip => travelAgency.searchForUserViaID(trip.userID)).join(' ')} </p>`
    }

    searchForUser(travelAgency) {
        document.querySelector('.search-for-user').innerHTML = `<h1>Search for Traveler:</h1>
        <form id='form2'>
        <input type='text' class='search-user' id='search' placeholder='Search by name' value=''>
        <button type='submit' class='search-button form='form2'value='submit'>Search</button>
        <section class='display-search'></section`
    }

    displaySearchUser(travelAgency) {
        debugger
        let searchInput = document.querySelector('.search-user');
        document.querySelector('.display-search').innerHTML =
            `<p class='key'>id:</p> ${travelAgency.searchForUser(searchInput.value).id}
            <p class='key'>name:</p> ${travelAgency.searchForUser(searchInput.value).name}
            <p class='key'>Traveler Type:</p> ${travelAgency.searchForUser(searchInput.value).travelerType}
            <p class='key'>Total Spent For Year:</p> ${travelAgency.searchForUser(searchInput.value).totalSpentForYear}
            `
            this.requestedTrips(travelAgency, travelAgency.searchForUser(searchInput.value).pendingTrips)
            // ${travelAgency.searchForUser(searchInout.value).pendingTrips}`)

        // trips: ${this.displayTripsInSearch(travelAgency, travelAgency.searchForUser(searchInput.value).trips)},
    }

    displayPendingTripsInSearch(pendingTrips) {
        // let pendingTripsHTML = pendingTrips.map(trip =)
        // document.querySelector('.key-pending').insertAdjacentHTML('beforeend', 
        // )
    }

    displayTripsInSearch(travelAgency, trips) {
        return trips.map(trip => travelAgency.findDestination(trip.destinationID))
    }

    income(travelAgency) {
        document.querySelector('.income').innerHTML = `<h1>Total Income for Year:</h1>
        $${travelAgency.agencyMargin(travelAgency.tripsData)}.00<br>
        <h1>Total Income All Time:</h1>
        $${travelAgency.totalSpentAllTime(travelAgency.tripsData)}.00`
    }

    travelerDashboard(traveler) {
        document.querySelector('.main').innerHTML = `<article class='traveler-dashboard'>
        <section class='all-trips scrollable'></section>
        <section class='amount-spent'></section>
        <section class='trip-request'></section>
        <section class='pending-trips scrollable'></section>
        </article>`
        this.allTrips(traveler)
        this.amountSpent(traveler)
        this.requestTrip(traveler)
        this.pendingTrips(traveler)
    }

    allTrips(traveler) {
        document.querySelector('.all-trips').innerHTML = 
        `<h1>All Trips:</h1>`
        const userTrips = traveler.trips.map(trip => {
            return `
            <div class ='trip-card'>
            <p class='trips-display'>
            <p class='key'>Trip ID:</p> ${trip.id}
            <p class='key'>Destination:</p> ${traveler.searchForDestination(trip.destinationID)}
            <p class='key'>Start Date:</p> ${trip.date}
            <p class='key'>Duration:</p> ${trip.duration} days
            </p></div>`
        }).join(' ')
        document.querySelector('.all-trips').insertAdjacentHTML('beforeend', userTrips)
    }
    

    amountSpent(traveler) {
        document.querySelector('.amount-spent').innerHTML = 
        `<h1>Amount Spent This Year:</h1>
        You have spent $${traveler.accumulatedTotal(traveler.trips)}.00 with Travel Tracker this year.
        <h1>Total Spent with Travel Tracker:</h1>
        You have spent $${traveler.totalSpent}.00 all together`
    }

    requestTrip(traveler) {
        document.querySelector('.trip-request').innerHTML = 
        `<h1>Request a Trip:</h1>
        <form class='form4'>
        <label for='trip-start-date' class='key'>Start Date:</label>
        <input type='date' id='trip-start-date' class='start-date-calendar' name='trip-start' min='${this.date = moment().format('YYYY-MM-DD')}' value='${this.date = moment().format('YYYY-MM-DD')}'>
        <br><label for='number-of-days' class='key'>Number of Days:</label>
        <input type='number' id='number-of-days' min='1' max='365' value=''>
        <br><label for='num-travelers' class='key'>Number of Travelers:</label>
        <input type='number' id='num-travelers' min='1' max='12' value=''>
        <br><label for='vacation-destination' class='key'>Destination:</label>
        <select name='destination-dropdown' id='vacation-destination'>
            ${this.destinationsDropDown(traveler)}
        </select>
        </form>
        <button type='submit' class='estimated-cost-button' form='form4'>Estimated Cost</button>
        <div class='cost-display'><div>`
    }

    estimatedCost(traveler, numTravelers, numDays, destinationID) {
        document.querySelector('.cost-display').innerHTML =
        `$${traveler.getEstimatedCost(numTravelers, numDays, destinationID)}.00 <br>
        <button type='submit' class='book-trip-button form='form4'>Book Trip</button>`
    }
    
    destinationsDropDown(traveler) {
        const destinationsOptions = traveler.destinationData.map(destination => {
           return `<option value='${destination.id}'>${destination.destination}</option>`
        }).join(' ')
        return destinationsOptions
    }

    pendingTrips(traveler) {
        console.log(traveler.pendingTrips)
        debugger
        let pendingTrips = traveler.pendingTrips
        document.querySelector('.pending-trips').innerHTML = 
        `<h1>Pending Trips:</h1>`
        let unapprovedTrips = pendingTrips.map(trip =>{
        return `<div class='trip-card'><p class='travelers-pending'>
        <p class='key'>Trip ID:</p> ${trip.id}
        <p class='key'>Destination:</p> ${traveler.searchForDestination(trip.destinationID)}
        <p class='key'>Start Date:</p> ${trip.date}
        <p class='key'>Duration:</p> ${trip.duration} days
        <p class='key'>Status:</p> ${trip.status}</p></div>`
        }).join(' ')
        document.querySelector('.pending-trips').insertAdjacentHTML('beforeend', unapprovedTrips)
    }

    // displayError(traveler) {
    //     debugger
    //     let form = document.getElementById('form1')
    //     form.insertAdjacentHTML('afterend', `ERROR`)
    //     this.clearInputs()
    // }

    cycleImages(destinations) {
        let num = Math.random() * (50 - 0)
        let index = Math.round(num)
        document.querySelector('.main').innerHTML = `<header class='welcome-message'><h2>Welcome to Travel Tracker</h2></header>
         <section class='images'><img src="${destinations[index].image}" alt="${destinations[index].image.alt}" class='cycling-images'>
         <p class='main-menu-travel-deal'>Flights to ${destinations[index].destination} for $${destinations[index].estimatedFlightCostPerPerson}.00 with lodging starting at $${destinations[index].estimatedLodgingCostPerDay}.00</p></section>`
    }

    logOut() {
       document.querySelector('.log-in').innerHTML = 
       `<button type='submit' class='logout' value='submit'>Log Out</button>`
    }
}


export default DomUpdates;