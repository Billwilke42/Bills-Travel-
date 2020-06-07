import User from '../src/User.js'
import moment from 'moment'

class Traveler extends User {
    constructor(travelersData, destinationData, tripsData, user) {
        super(travelersData, destinationData, tripsData) 
            if(travelersData, destinationData, tripsData, user) {
                this.id = user.id;
                this.name = user.name;
                this.travelerType = user.travelerType;
                this.trips = this.getUserTrips();
                this.totalSpentForYear = this.accumulatedTotal(this.trips)
                this.pendingTrips = this.tripsRequested(this.trips)
                this.totalSpentAllTime = this.totalSpentAllTime(this.trips)
            }
    }

    getUserTrips() {
        const trips = this.tripsData.filter(trip => trip.userID === this.id)
        return trips
    }

    makeTripRequest(num, date, numDays, destination) {
        fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": Date.now(),
                "userID": this.id,
                "destinationID": destination,
                "travelers": num,
                "date": date,
                "duration": numDays,
                "status": "pending",
                "suggestedActivities": []
            })
        })
            .then(response => response.json())
            .then((data) => {
            console.log('Success:', data) 
            })
            .catch(err => console.log(err.message));
    }

    getEstimatedCost(numTravelers, duration, destinationId) {
        let destinationID = parseInt(destinationId)
        const destination = this.destinationData.find(destination => destination.id === destinationID)
        let flightsCost = numTravelers * destination.estimatedFlightCostPerPerson;
        let lodgingCost = duration * destination.estimatedLodgingCostPerDay
        const estimatedCost = flightsCost + lodgingCost;
        return estimatedCost
    }
}


export default Traveler