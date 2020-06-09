import User from '../src/User.js'
import Traveler from './Traveler.js';
import moment from 'moment'

class TravelAgency extends User {
    constructor(travelersData, destinationData, tripsData, currentDate) {
        super(travelersData, destinationData, tripsData)
        if(travelersData, destinationData, tripsData) {
            this.requestedTrips = this.tripsRequested(tripsData);
            this.travelersOnTrips = this.travelersThatAreOnTrips(currentDate);
            this.totalIncome = this.agencyMargin(tripsData);
        }
    }

    travelersThatAreOnTrips(currentDate) {
        let travelersOnTrips = this.tripsData.reduce((currentTrips, trip) => {
            let startDate = moment(trip.date)
            let endDate = startDate.clone().add(trip.duration, 'days').format('YYYY/MM/DD')
            if(trip.date <= currentDate && endDate > currentDate) {
                currentTrips.push(trip)
            }
            return currentTrips
        }, [])
        return travelersOnTrips
    }

    searchForUser(name) {
        let userData = this.travelersData.find(traveler => traveler.name.includes(name))
        // if(userData === undefined) {
        //   return undefined
        // } e
        let user = new Traveler(this.travelersData, this.destinationData, this.tripsData, userData)
        // let searchedUser = {
        //     id: user.id,
        //     name: user.name,
        //     travelerType: user.travelerType,
        //     trips: user.trips,
        //     totalSpent: user.totalSpent
        // }
        return user
        // fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip/${id}`)
        //     .then(response => response.json())
        //     .then((data) => {
        //         return data
        //     })
        //     .catch(err => console.log(err.message));
    }

    searchForUserViaID(id) {
        let userData = this.travelersData.find(traveler => traveler.id === id)
        let user = new Traveler(this.travelersData, this.destinationData, this.tripsData, userData)
        // let searchedUser = {
        //     id: user.id,
        //     name: user.name,
        //     travelerType: user.travelerType,
        //     trips: user.trips,
        //     totalSpent: user.totalSpent
        // }`
        return user.name
        // fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip/${id}`)
        //     .then(response => response.json())
        //     .then((data) => {
        //         return data
        //     })
        //     .catch(err => console.log(err.message));
    }

    approveTrip(trip, travelAgency, domUpdates) {
        fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "id": trip,
              "status": 'approved'
            })
          })
            .then(response => response.json())
            .then((data) => {
            console.log(`Trip ${trip} has been modified', updatedResource:${data}`, data) 
            })
            .then(data => {
              this.getTravelerTrips(domUpdates, travelAgency)
            })
            .catch(err => console.log(err.message));
    }

    getTravelerTrips(domUpdates, travelAgency) {
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
      .then(response => response.json())
         .then((data) => {
            return data
         }).then(data => {
          this.requestedTrips = this.tripsRequested(data.trips);
          this.travelersOnTrips = this.travelersThatAreOnTrips(data.trips);
          this.totalIncome = this.agencyMargin(data.trips);
          return data
          }).then( data => {
              domUpdates.agencyDashboard(travelAgency)
          })
         .catch(err => console.log(err.message));
  }

    deleteTrip(trip, travelAgency, domUpdates) {
            fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "id": trip               
                })
              })
                .then(response => response.json())
                .then((data) => {
                console.log(`Trip ${trip} has been deleted`, data) 
                })
                .then(data => {
                  this.getTravelerTrips(domUpdates, travelAgency)
                })
                .catch(err => console.log(err.message))
   }
}


export default TravelAgency;