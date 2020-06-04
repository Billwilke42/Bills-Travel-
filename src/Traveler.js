import User from '../src/User.js'

class Traveler extends User {
    constructor(travelersData, destinationData, tripsData, user) {
        super(travelersData, destinationData, tripsData) 
            if(travelersData, destinationData, tripsData, user) {
                this.id = user.id;
                this.name = user.name;
                this.travelerType = user.travelerType;
                this.trips = this.getUserTrips();
                this.totalSpent = this.accumulatedTotal(this.trips)
            }
    }

    getUserTrips() {
        const trips = this.tripsData.filter(trip => trip.userID === this.id)
        return trips
    }

    makeTripRequest() {

    }

    getEstimatedCost(numTravelers, duration, destinationId) {
        const destination = this.destinationData.find(destination => destination.id === destinationId)
        let flightsCost = numTravelers * destination.estimatedFlightCostPerPerson;
        let lodgingCost = duration * destination.estimatedLodgingCostPerDay
        const estimatedCost = flightsCost + lodgingCost;
        return estimatedCost
    }
}


export default Traveler