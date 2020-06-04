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
}


export default Traveler