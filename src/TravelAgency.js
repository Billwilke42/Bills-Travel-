class TravelAgency {
    constructor(travelersData, destinationData, tripsData, currentDate) {
        if(travelersData, destinationData, tripsData) {
            this.travelersData = travelersData;
            this.destinationData = destinationData;
            this.tripsData = tripsData;
            this.requestedTrips = this.tripsRequested();
            this.travelersOnTrips = this.travelersThatAreOnTrips(currentDate);
            this.totalIncome = this.allIncome();
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

    totalExpenditureWithoutProfit() {
        let costFlights;
        let costLodging
        let totalSpent = this.tripsData.reduce((total, trip) => {
            this.destinationData.forEach(destination => {
                if(trip.destinationID === destination.id) {
                    costFlights = destination.estimatedFlightCostPerPerson * trip.travelers;
                    costLodging = destination.estimatedLodgingCostPerDay * trip.duration;
                }
                total += costFlights + costLodging
            })
            return total
        }, 0)
        return totalSpent
    }

    allIncome() {
        const expenditure = this.totalExpenditureWithoutProfit()
        const margin = expenditure * .10
        return margin
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