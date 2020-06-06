const chai = require('chai');
import { expect } from 'chai';
let spies = require("chai-spies");
chai.use(spies);

import DomUpdates from '../src/DomUpdates'


describe('DomUpdates', () => {
  let domUpdates
  let mainArea;
  beforeEach(() => {
    // global.document = {};
    // chai.spy.on(document, 'querySelector', () => {})
    // chai.spy.on(document, 'getElementById', () => {})
    // domUpdates = new DomUpdates()
    // chai.spy.on(querySelector, '')
    // chai.spy.on(domUpdates, "agencyDashboard", () => {});
    // chai.spy.on(domUpdates, 'displayAgencyDashboard', () => {})
    // chai.spy.on(domUpdates, "displayTravelerDashboard", () => {});
    // chai.spy.on(domUpdates, "requestedTrips", () => {});
    // chai.spy.on(domUpdates, "searchForUser", () => {});
    // chai.spy.on(domUpdates, 'travelersOnTrips', () => {})
    // chai.spy.on(domUpdates, "income", () => {});
    // chai.spy.on(domUpdates, "allTrips", () => {});
    // chai.spy.on(domUpdates, "amountSpent", () => {});
    // chai.spy.on(domUpdates, "requestTrip", () => {});
    // chai.spy.on(domUpdates, "pendingTrips", () => {});
    // chai.spy.on(domUpdates, "displayError", () => {});
    // chai.spy.on(domUpdates, "cycleImages", () => {});
  })
  
  
  it('should be a function', function() {
    expect(DomUpdates).to.be.a('function');
  });

  // I have function updateTraveler inside of my curlys I call searchForTraveler
  // then I call another function called updateDom or updateheader, and inside of those
  // examples is where I call document.querySelector. I can spy on the function 
  // updateDom to see that its been called without having to mock out document.querySelector


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

  // it.only('should envoke travelerDashboard and clearInputs when displayAgencyDashboard is called', function() {
  //   global.document = {};
  //   let domUpdates = new DomUpdates()
  //   let spy3 = chai.spy.on(document, ['querySelector', 'innerHTML'], () => {})
  //   let spy = chai.spy.on(domUpdates, 'allTrips', () => {})
  //   let spy2 = chai.spy.on(domUpdates, 'amountSpent', () => {})
  //   domUpdates.travelerDashboard()
  //   expect(spy).to.have.been.called(1)
  //   expect(spy2).to.have.been.called(1)
  // })

  
  
  // it('should be able to display the agency dashboard', function() {
  //   domUpdates.agencyDashboard()
  //   expect(domUpdates.requestedTrips).to.have.been.called(1);
  // });

  // it('should be able to display the agency dashboard', function() {
  //   domUpdates.displayAgencyDashboard()
  //   expect(domUpdates.displayAgencyDashboard).to.have.been.called(1);
  // });

  // it('should be able to display the traveler dashboard', function() {
  //   domUpdates.displayTravelerDashboard()
  //   expect(domUpdates.displayTravelerDashboard).to.have.been.called(1);
  // });

  // it('should be able to display the requested trips', function() {
  //   domUpdates.requestedTrips()
  //   expect(domUpdates.requestedTrips).to.have.been.called(1);
  // });

  // it('should be able to display the search for users', function() {
  //   domUpdates.searchForUser()
  //   expect(domUpdates.searchForUser).to.have.been.called(1);
  // });

  // it('should be able to display the travelers on trips', function() {
  //   domUpdates.travelersOnTrips()
  //   expect(domUpdates.travelersOnTrips).to.have.been.called(1);
  // });

  // it('should be able to display the income for the agency', function() {
  //   domUpdates.income()
  //   expect(domUpdates.income).to.have.been.called(1);
  // });

  // it('should be able to display the income for the agency', function() {
  //   domUpdates.income()
  //   expect(domUpdates.income).to.have.been.called(1);
  // });

  // it('should be able to display the amountSpents', function() {
  //   domUpdates.allTrips()
  //   expect(domUpdates.allTrips).to.have.been.called(1);
  // });

  // it('should be able to display the amountSpent', function() {
  //   domUpdates.amountSpent()
  //   expect(domUpdates.amountSpent).to.have.been.called(1);
  // });

  // it('should be able to display the requested trips', function() {
  //   domUpdates.requestTrip()
  //   expect(domUpdates.requestTrip).to.have.been.called(1);
  // });

  // it('should be able to display the requested trips', function() {
  //   domUpdates.pendingTrips()
  //   expect(domUpdates.pendingTrips).to.have.been.called(1);
  // });

  // it('should be able to display the requested trips', function() {
  //   domUpdates.displayError()
  //   expect(domUpdates.displayError).to.have.been.called(1);
  // });

  // it('should be able to display the requested trips', function() {
  //   domUpdates.cycleImages()
  //   expect(domUpdates.cycleImages).to.have.been.called(1);
  // });
});