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
            expect(user.totalExpenditureWithoutProfit(tripsData)).to.equal(35715)
        })

        it('should be able to calculate total Income', function() {
            expect(user.agencyMargin(tripsData)).to.equal(3571.5)
        })

        it('should be able to bring back the total people have spent at the agency' , function() {
            expect(user.accumulatedTotal(tripsData)).to.equal(39286.5)
        })
    })
})