import User from '../src/User.js'
import Traveler from './Traveler.js';

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

    
    searchForUser(id) {
        // let userData = this.travelersData.find(traveler => traveler.name.includes(name))
        // let user = new Traveler(this.travelersData, this.destinationData, this.tripsData, userData)
        // let searchedUser = {
        //     id: user.id,
        //     name: user.name,
        //     travelerType: user.travelerType,
        //     trips: user.trips,
        //     totalSpent: user.totalSpent
        // }
        // return searchedUser
        fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip/${id}`)
            .then(response => response.json())
            .then((data) => {
                return data
            })
            .catch(err => console.log(err.message));
    }

    approveTrip(trip) {
        fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "id": trip.id,
              "status": 'approved'
            })
          })
            .then(response => response.json())
            .then((data) => {
            console.log('Success:', data) 
            })
            .catch(err => console.log(err.message));
    }

    denyTrip() { 
        fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "id": trip.id,
              "status": 'approved'
            })
          })
            .then(response => response.json())
            .then((data) => {
            console.log('Success:', data) 
            })
            .catch(err => console.log(err.message));
    }

    deleteTrip() {
            fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "id": trips.id               
                })
              })
                .then(response => response.json())
                .then((data) => {
                console.log('Success:', data) 
                })
                .catch(err => console.log(err.message))
   }

}

export default TravelAgency;