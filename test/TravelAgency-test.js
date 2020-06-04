const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);

import TravelAgency from '../src/TravelAgency.js'
import travelersData from './data/travelers.js'
import destinationData from './data/destinations.js'
import tripsData from './data/trips.js'
import User from '../src/User.js'

let travelAgency;
let user;

describe('Travel Agency', function() {
    beforeEach(() => {
        user = new User(travelersData, destinationData, tripsData)
        travelAgency = new TravelAgency()
    })

    it('should be a function', function() {
        expect(TravelAgency).to.be.a('function');
    });
    
    it('should be an instance of a TravelAgency', function () {
        expect(travelAgency).to.be.an.instanceof(TravelAgency);
    });
    
    it('should not require an argument to create a new TravelAgency', () => {
        expect(() => {
          new TravelAgency() 
        }).to.not.throw(Error);
    });

    describe('Travel Agency Data', function() {
        beforeEach(() => {
            travelAgency = new TravelAgency(travelersData, destinationData, tripsData)
        })
        
        it('should hold onto travelers data', function() {
            expect(travelAgency.travelersData).to.equal(travelersData)
        })

        it('should hold onto destination data', function() {
            expect(travelAgency.destinationData).to.equal(destinationData)
        })

        it('should hold onto trips data', function() {
            expect(travelAgency.tripsData).to.equal(tripsData)
        })
    })

    describe('Travel Agency Methods', function() {
        beforeEach(() => {
            let currentDate = "2020/06/29"
            user = new User(travelersData, destinationData, tripsData)
            travelAgency = new TravelAgency(travelersData, destinationData, tripsData, currentDate)
        })
        it('should be able to see all requested Trips', function() {
            travelAgency.tripsRequested()
            expect(travelAgency.requestedTrips).to.deep.equal([
                {
                    "id": 2,
                    "userID": 35,
                    "destinationID": 2,
                    "travelers": 5,
                    "date": "2020/10/04",
                    "duration": 18,
                    "status": "pending",
                    "suggestedActivities": []
                },
                {
                    "id": 3,
                    "userID": 3,
                    "destinationID": 3,
                    "travelers": 4,
                    "date": "2020/05/22",
                    "duration": 17,
                    "status": "pending",
                    "suggestedActivities": []
                }
            ])
        })
        
        it('should see travelers that are currently on trips', function() {
            expect(travelAgency.travelersOnTrips).to.deep.equal([
                {
                    "id": 6,
                    "userID": 29,
                    "destinationID": 6,
                    "travelers": 3,
                    "date": "2020/06/29",
                    "duration": 9,
                    "status": "approved",
                    "suggestedActivities": []
                }
            ])
        })

        it('should get the total expenditure of all customers', function() {
            expect(travelAgency.totalExpenditureWithoutProfit(tripsData)).to.equal(43325)
        })

        it('should be able to calculate total Income', function() {
            expect(travelAgency.agencyMargin(tripsData)).to.equal(4332.5)
        })

        it('should be able to bring back the total people have spent at the agency' , function() {
            expect(travelAgency.accumulatedTotal(tripsData)).to.equal(47657.5)
        })

        it('should be able to search for a user', function() {
            expect(travelAgency.searchForUser("Ham Leadbeater")).to.deep.equal({
                id: 1,
                name: 'Ham Leadbeater',
                travelerType: 'relaxer',
                trips: [
                  {
                    id: 8,
                    userID: 1,
                    destinationID: 8,
                    travelers: 6,
                    date: '2021/02/07',
                    duration: 4,
                    status: 'approved',
                    suggestedActivities: []
                  }
                ],
                totalSpent: 7150
              })
        })

    })
})