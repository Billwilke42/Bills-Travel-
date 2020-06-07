class DomUpdates {
    constructor(date) {
        this.date = date
    }

    displayAgencyDashboard(travelAgency, counter) {
        // clearTimeout(cycle)
        this.agencyDashboard(travelAgency, counter)
        this.clearInputs()
    }
    
    clearInputs() {
        document.getElementById('username').value = ''
        document.getElementById('password').value = ''
    }
    
    agencyDashboard(travelAgency) {
        document.querySelector('.main').innerHTML = `<article class='agency-dashboard'>
        <section class='requested-trips scrollable'><h1>Trips Requested:</h1></section>
        <section class='travelers-on-trips'></section>
        <section class='search-for-user'></section>
        <section class='income'></section>
        </article>`
        this.requestedTrips(travelAgency)
        this.travelersOnTrips(travelAgency)
        this.searchForUser(travelAgency)
        this.income(travelAgency)
    }

    displayTravelerDashboard(traveler) {
        // clearTimeout(cycle)
        this.travelerDashboard(traveler)
        this.clearInputs()
    }

    requestedTrips(travelAgency) {
        let requestedTrips = travelAgency.requestedTrips
        let requested = requestedTrips.map(trip => {
           return `
            <section class='pending-trip-card'>
            <p class='requested-trip-text'>
            Trip ID: ${trip.id}
            Traveler: ${travelAgency.searchForUserViaID(trip.userID)}
            Destination: ${travelAgency.searchForDestination(trip.destinationID)}
            Start Date: ${trip.date}
            Duration: ${trip.duration} days
            </p>
            <button type='submit' class='approve-trip-button' value='submit'>Approve</button>
            <button type='submit' class='deny-trip-button' value='submit'>Deny</button>
            </section>`
        }).join(' ')
            document.querySelector('.requested-trips').insertAdjacentHTML('beforeend', requested)
    }

    travelersOnTrips(travelAgency) {
        document.querySelector('.travelers-on-trips').innerHTML = `<h1>Travelers on trips:</h1>
        <p>We have ${travelAgency.travelersThatAreOnTrips(this.date).length} travelers vacationing today,
        They are ${travelAgency.travelersThatAreOnTrips(this.date).map(trip => travelAgency.searchForUserViaID(trip.userID))}</p>`
    }

    searchForUser(travelAgency) {
        document.querySelector('.search-for-user').innerHTML = `<h1>Search for Traveler:</h1>
        <form id='form2'>
        <input type='text' class='search-user' id='search' placeholder='Search by name' value=''>
        <button type='submit' class='search-button form='form2'value='submit'>Search</button>`
    }

    displaySearchUser(travelAgency) {
        debugger
        let searchInput = document.querySelector('.search-user');
        console.log(searchInput.value)
        document.querySelector('.search-for-user').insertAdjacentHTML('beforeend', 
            `id: ${travelAgency.searchForUser(searchInput.value).id},
            name: ${travelAgency.searchForUser(searchInput.value).name},
            travelerType: ${travelAgency.searchForUser(searchInput.value).travelerType},
            totalSpent: ${travelAgency.searchForUser(searchInput.value).totalSpent}`)
        }
        // trips: ${this.displayTripsInSearch(travelAgency, travelAgency.searchForUser(searchInput.value).trips)},

    displayTripsInSearch(travelAgency, trips) {
        return trips.map(trip => travelAgency.findDestination(trip.destinationID))
    }

    income(travelAgency) {
        document.querySelector('.income').innerHTML = `<h1>Total Income for Year:</h1>
        $${travelAgency.agencyMargin(travelAgency.tripsData)}.00`
    }

    travelerDashboard(traveler) {
        document.querySelector('.main').innerHTML = `<article class='traveler-dashboard'>
        <section class='all-trips scrollable'></section>
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
        debugger
        const userTrips = traveler.trips.map(trip => {
            return `
            <p class='trips-display'>
            Trip ID: ${trip.id}
            Destination: ${traveler.searchForDestination(trip.destinationID)}
            Start Date: ${trip.date}
            Duration: ${trip.duration} days
            </p>`
        }).join(' ')
        document.querySelector('.all-trips').insertAdjacentHTML('beforeend', userTrips)
    }
    

    amountSpent(traveler) {
        document.querySelector('.amount-spent').innerHTML = 
        `<h1>Amount Spent:</h1>
        Your have spent $${traveler.accumulatedTotal(traveler.trips)}.00 with Travel Tracker.`
    }

    requestTrip(traveler) {
        document.querySelector('.trip-request').innerHTML = 
        `<h1>Request a Trip:</h1>`
    }

    pendingTrips(traveler) {
        debugger
        let pendingTrips = traveler.pendingTrips
        console.log(pendingTrips)
        document.querySelector('.pending-trips').innerHTML = 
        `<h1>Pending Trips:</h1>`

        let unapprovedTrips = pendingTrips.map(trip =>{
        return `<p class='travelers-pending'>
        Trip ID: ${trip.id}
        Destination: ${traveler.searchForDestination(trip.destinationID)}
        Start Date: ${trip.date}
        Duration: ${trip.duration} days
        Status: ${trip.status}</p>`
        }).join(' ')
        console.log(unapprovedTrips)
        document.querySelector('.pending-trips').insertAdjacentHTML('beforeend', unapprovedTrips)
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