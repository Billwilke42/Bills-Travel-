import User from '../src/User.js'
import Traveler from './Traveler.js';
import tripsData from '../test/data/trips.js';

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

    
    searchForUser(name) {
        let userData = this.travelersData.find(traveler => traveler.name.includes(name))
        let user = new Traveler(this.travelersData, this.destinationData, this.tripsData, userData)
        let searchedUser = {
            id: user.id,
            name: user.name,
            travelerType: user.travelerType,
            trips: user.trips,
            totalSpent: user.totalSpent
        }
        return searchedUser
    }

    approveTrip() {

    }

    denyTrip() {

    }

    deleteTrip() {

    }


}

export default TravelAgency;