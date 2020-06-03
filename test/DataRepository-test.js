const chai = require('chai')
import { expect } from 'chai';
import { assert } from 'chai';
import DataRepository from '../src/DataRepository.js'
import travelers from './data/travelers.js';

describe('Data Repository', function() {
  it('should not require a property to create a new Data Repository', function () {
    let dataRepository = new DataRepository()
    assert.equal(dataRepository.travelers, undefined);
  })
})

describe('Data Repository', function() {

  let dataRepository;

  beforeEach(() => {
    dataRepository = new DataRepository(travelers);
  });
    
  it('should be a function', function() {
    expect(DataRepository).to.be.a('function');
  });
  
  it('should be an instance of a data Repository', function() {
    expect(dataRepository).to.be.an.instanceof(DataRepository);
  });
  
  it('should be able to hold every data\'s data', function() {
    expect(dataRepository.travelers).to.be.an('array');
    expect(dataRepository.travelers[0]).to.deep.equal(travelers[0])
    expect(dataRepository.travelers[4].name).to.equal("Tiffy Grout")
  });

  it('should be able to return a data based on their id', function() {
    expect(dataRepository.findUser(5)).to.deep.equal(travelers[4])
  });

  it('should return an error if user id is not a number', function() {
    expect(dataRepository.findUser('hat')).to.equal('Sorry, \'hat\' is not a user id.')
    expect(dataRepository.findUser()).to.equal('Sorry, \'undefined\' is not a user id.')
  });
});