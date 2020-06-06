class User {
    constructor(travelersData, destinationData, tripsData, date) {
        this.travelersData = travelersData;
        this.destinationData = destinationData;
        this.tripsData = tripsData;
        this.currentDate = date
    }

    totalExpenditureWithoutProfit(tripData) {
        if(tripData instanceof Array) {
        let costFlights, costLodging;
        let totalSpent = tripData.reduce((total, trip) => {
            this.destinationData.forEach(destination => {
                if(trip.destinationID === destination.id && Number(trip.date.split('/')[0]) > 2019) {
                    costFlights = destination.estimatedFlightCostPerPerson * trip.travelers
                    costLodging = destination.estimatedLodgingCostPerDay * trip.duration
                } else {
                    return 0
                }
                total += costFlights + costLodging
            })
            return total
        }, 0)
        return totalSpent
    }
}

    agencyMargin(tripData) {
        const expenditure = this.totalExpenditureWithoutProfit(tripData)
        const margin = expenditure * .10
        return margin
    }

    accumulatedTotal(tripData) {
        const expenditure = this.totalExpenditureWithoutProfit(tripData) 
        const margin = this.agencyMargin(tripData)
        const total = expenditure + margin
        return total
    }

    logIn() {

    }
}

export default User;