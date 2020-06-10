import User from '../src/User.js'

class Traveler extends User {
    constructor(travelersData, destinationData, tripsData, user) {
        super(travelersData, destinationData, tripsData) 
            if(travelersData, destinationData, tripsData, user) {
                this.id = user.id;
                this.name = user.name;
                this.travelerType = user.travelerType;
                this.trips = this.getUserTrips(tripsData);
                this.totalSpentForYear = this.accumulatedTotal(this.trips)
                this.pendingTrips = this.tripsRequested(this.trips)
                this.totalSpent = this.totalSpentAllTime(this.trips)
            }
    }

    getUserTrips(tripsData) {
        const trips = tripsData.filter(trip => trip.userID === this.id)
        return trips
    }

    makeTripRequest(num, date, numDays, destination, traveler, domUpdates) {
        fetch('	https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
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
            return console.log(`'Resource with id ${Date.now()} successfully posted', newResource: ${data}`, data) 
            })
            .then( data => { 
                this.getTravelerTrips(domUpdates, traveler)
            })
            .catch(err => console.log(err.message));
    }

    getTravelerTrips(domUpdates, traveler) {
        fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
        .then(response => response.json())
           .then((data) => {
              return data
           }).then(data => {
            this.trips = this.getUserTrips(data.trips);
            this.totalSpentForYear = this.accumulatedTotal(this.trips)
            this.pendingTrips = this.tripsRequested(this.trips)
            this.totalSpent = this.totalSpentAllTime(this.trips)
            return data
            }).then( data => {
                domUpdates.travelerDashboard(traveler)
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