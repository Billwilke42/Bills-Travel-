const chai = require('chai');
import { expect } from 'chai';
let spies = require("chai-spies");
chai.use(spies);

import DomUpdates from '../src/DomUpdates'
import Traveler from '../src/Traveler'
import TravelAgency from '../src/TravelAgency'
import moment from 'moment'
import travelersData from './data/travelers.js'
import destinationData from './data/destinations.js'
import tripsData from './data/trips.js'

describe('DomUpdates', () => {
  let domUpdates;
  let traveler;
  let date;
  
  it('should be a function', function() {
    expect(DomUpdates).to.be.a('function');
  });
  
  it('should envoke agencyDashboard and clearInputs when displayAgencyDashboard is called', function() {
    let domUpdates = new DomUpdates()
    let spy = chai.spy.on(domUpdates, 'agencyDashboard', () => {})
    let spy2 = chai.spy.on(domUpdates, 'clearInputs', () => {})
    domUpdates.displayAgencyDashboard()
    expect(spy).to.have.been.called(1)
    expect(spy2).to.have.been.called(1)
  })

  it('should envoke travelerDashboard and clearInputs when displayAgencyDashboard is called', function() {
    let domUpdates = new DomUpdates()
    let spy = chai.spy.on(domUpdates, 'travelerDashboard', () => {})
    let spy2 = chai.spy.on(domUpdates, 'clearInputs', () => {})
    domUpdates.displayTravelerDashboard()
    expect(spy).to.have.been.called(1)
    expect(spy2).to.have.been.called(1)
  })

  it('should envoke allTrips, amountSpent, requestTrip, and pendingTrips when displayAgencyDashboard is called', function() {
    global.document = {};
    domUpdates = new DomUpdates()
    traveler = new Traveler(travelersData, destinationData, tripsData, travelersData[4])
    let spy = chai.spy.on(domUpdates, 'allTrips', () => {})
    let spy2 = chai.spy.on(domUpdates, 'amountSpent', () => {})
    let spy3 = chai.spy.on(domUpdates, 'requestTrip', () => {})
    let spy4 = chai.spy.on(domUpdates, 'pendingTrips', () => {})
    chai.spy.on(document, "querySelector", () => {return global.document});
    chai.spy.on(document, "innerHTML", () => {})
    chai.spy.on(document, "insertAdjacentHTML", () => {})
    domUpdates.travelerDashboard(traveler)
    expect(spy).to.have.been.called(1)
    expect(spy2).to.have.been.called(1)
    expect(spy3).to.have.been.called(1)
    expect(spy4).to.have.been.called(1)
  })

    it('should envoke requestedTrips, travelersOnTrips, searchForUser, and income when displayAgencyDashboard is called', function() {
    global.document = {};
    domUpdates = new DomUpdates()
    date = date = moment().format('YYYY/MM/DD')
    traveler = new TravelAgency(travelersData, destinationData, tripsData, date)
    let spy = chai.spy.on(domUpdates, 'requestedTrips', () => {})
    let spy2 = chai.spy.on(domUpdates, 'travelersOnTrips', () => {})
    let spy3 = chai.spy.on(domUpdates, 'searchForUser', () => {})
    let spy4 = chai.spy.on(domUpdates, 'income', () => {})
    chai.spy.on(document, "querySelector", () => {return global.document});
    chai.spy.on(document, "innerHTML", () => {})
    chai.spy.on(document, "insertAdjacentHTML", () => {})
    domUpdates.agencyDashboard(traveler)
    expect(spy).to.have.been.called(1)
    expect(spy2).to.have.been.called(1)
    expect(spy3).to.have.been.called(1)
    expect(spy4).to.have.been.called(1)
  })
});