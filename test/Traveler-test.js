const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);

import travelersData from './data/travelers.js'
import destinationData from './data/destinations.js'
import tripsData from './data/trips.js'
import Traveler from '../src/Traveler.js'

let traveler;

describe('Traveler', function() {
    beforeEach(() => {
        traveler = new Traveler()
    })

    it('should be a function', function() {
        expect(Traveler).to.be.a('function');
    });
    
    it('should be an instance of a Traveler', function () {
        expect(traveler).to.be.an.instanceof(Traveler);
    });
    
    it('should not require an argument to create a new Traveler', () => {
        expect(() => {
          new Traveler() 
        }).to.not.throw(Error);
    });

    describe('Traveler Data', function() {
        beforeEach(() => {
            traveler = new Traveler(travelersData, destinationData, tripsData)
        })
        
        it('should hold onto travelers data', function() {
            expect(traveler.travelersData).to.equal(travelersData)
        })

        it('should hold onto destination data', function() {
            expect(traveler.destinationData).to.equal(destinationData)
        })

        it('should hold onto trips data', function() {
            expect(traveler.tripsData).to.equal(tripsData)
        })
    })

    describe('Traveler Instance', function() {
        this.beforeEach(() => {
            traveler = new Traveler(travelersData, destinationData, tripsData, travelersData[0])
        })

        it('should have a traveler id', function() {
            expect(traveler.id).to.equal(1)
        })

        it('should have a name', function() {
            expect(traveler.name).to.equal("Ham Leadbeater")
        })

        it('should have a traveler type', function() {
            expect(traveler.travelerType).to.equal("relaxer")
        })
        
        it('should have an array of all their trips', function() {
            expect(traveler.trips).to.deep.equal([
                {
                    "id": 8,
                    "userID": 1,
                    "destinationID": 8,
                    "travelers": 6,
                    "date": "2021/02/07",
                    "duration": 4,
                    "status": "approved",
                    "suggestedActivities": []
                }
            ])
        })

        it('should calculate all of its accumulated trips costs', function() {
            expect(traveler.accumulatedTotal(traveler.trips)).to.equal(7150)
        });

        it('should have a property of its accumulated total spent with the agency', function() {
            expect(traveler.totalSpent).to.equal(7150)
        })

    })
});