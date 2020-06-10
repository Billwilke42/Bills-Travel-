const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);

import travelersData from './data/travelers.js'
import destinationData from './data/destinations.js'
import tripsData from './data/trips.js'
import User from '../src/User.js'

let user;

describe('User', function() {
    beforeEach(() => {
        user = new User()
    })

    it('should be a function', function() {
        expect(User).to.be.a('function');
    });
    
    it('should be an instance of a user', function () {
        expect(user).to.be.an.instanceof(User);
    });
    
    it('should not require an argument to create a new user', () => {
        expect(() => {
          new User() 
        }).to.not.throw(Error);
    });

    describe('User Data', function() {
        beforeEach(() => {
            user = new User(travelersData, destinationData, tripsData)
        })
        
        it('should hold onto travelers data', function() {
            expect(user.travelersData).to.equal(travelersData)
        })

        it('should hold onto destination data', function() {
            expect(user.destinationData).to.equal(destinationData)
        })

        it('should hold onto trips data', function() {
            expect(user.tripsData).to.equal(tripsData)
        })
    })

    describe('User Methods', function() {
        this.beforeEach(() => {
            user = new User(travelersData, destinationData, tripsData)
        })

        it('should get the total expenditure of all customers', function() {
            expect(user.totalExpenditureWithoutProfitForYear(tripsData)).to.equal(35715)
        })

        it('should return undefined if improper data is given', function() {
            let data = {}
            expect(user.totalExpenditureWithoutProfitForYear(data)).to.equal(undefined)
        })

        it('should get the total spent of all customers', function() {
            expect(user.totalSpentAllTime(tripsData)).to.equal(47657)
        })

        it('should return undefined if improper data is given', function() {
            let data = {}
            expect(user.totalSpentAllTime(data)).to.equal(undefined)
        })

        it('should be able to calculate total Income', function() {
            expect(user.agencyMargin(tripsData)).to.equal(3571)
        })

        it('should be able to search for a destination', function() {
            expect(user.searchForDestination(1)).to.equal('Lima, Peru')
        })

        it('should return the trips requested', function() {
            expect(user.tripsRequested(tripsData)).to.deep.equal([
                {
                  id: 2,
                  userID: 35,
                  destinationID: 2,
                  travelers: 5,
                  date: '2020/10/04',
                  duration: 18,
                  status: 'pending',
                  suggestedActivities: []
                },
                {
                  id: 3,
                  userID: 3,
                  destinationID: 3,
                  travelers: 4,
                  date: '2020/05/22',
                  duration: 17,
                  status: 'pending',
                  suggestedActivities: []
                }
              ])
        })

        it('should return undefined if improper data is given', function() {
            let data = {}
            expect(user.tripsRequested(data)).to.equal(undefined)
        })

        it('should be able to bring back the total people have spent at the agency' , function() {
            expect(user.accumulatedTotal(tripsData)).to.equal(39286)
        })

        it('should return undefined if improper data is given', function() {
            let data = {}
            expect(user.accumulatedTotal(data)).to.equal(undefined)
        })
    })
})