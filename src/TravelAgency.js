import User from '../src/User.js'

class TravelAgency extends User {
    constructor(travelersData, destinationData, tripsData, currentDate) {
        super(travelersData, destinationData, tripsData)
        if(travelersData, destinationData, tripsData) {
            this.requestedTrips = this.tripsRequested();
            this.travelersOnTrips = this.travelersThatAreOnTrips(currentDate);
            this.totalIncome = this.agencyMargin(tripsData);
        }
    }

    tripsRequested() {
        let requestedTrips = this.tripsData.filter(trip => trip.status === 'pending')
        return requestedTrips
    }

    travelersThatAreOnTrips(currentDate) {
        let travelersOnTrips = this.tripsData.filter(trip => trip.date === currentDate)
        return travelersOnTrips
    }

    
    searchForUser() {

    }

    approveTrip() {

    }

    denyTrip() {

    }

    deleteTrip() {

    }


}

export default TravelAgency;