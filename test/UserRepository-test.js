const chai = require('chai')
import { expect } from 'chai';
import UserRepository from '../src/UserRepository.js'
import travelers from './data/travelers.js';


describe('User Repository', function() {

  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository(travelers);
  });
    
  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });
  
  it('should be an instance of a User Repository', function() {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });
  
  it('should be able to hold every user\'s data', function() {
    expect(userRepository.travelers).to.be.an('array');
    expect(userRepository.travelers[0]).to.deep.equal(travelers[0])
    expect(userRepository.travelers[4].name).to.equal("Tiffy Grout")
  });

  it('should return an error message if there is no user data', function() {
    userRepository = new UserRepository()
    expect(userRepository.travelers).to.equal('Error, data for user\'s cannot be found.')
  });

  it('should have a method that determines whether data passed in is an array', function() {
    userRepository = new UserRepository('horse')
    expect(userRepository.checkIfDataIsArray('horse')).to.equal('Error, data for user\'s cannot be found.')
    expect(userRepository.travelers).to.equal('Error, data for user\'s cannot be found.')


    const userRepository2 = new UserRepository(travelers)
    expect(userRepository2.checkIfDataIsArray(travelers)).to.equal(travelers)
    expect(userRepository2.travelers).to.deep.equal(travelers)
  });

  it('should be able to return a user based on their id', function() {
    expect(userRepository.findUser(5)).to.deep.equal(travelers[4])
  });

  it('should return an error if user id is not a number', function() {
    expect(userRepository.findUser('hat')).to.equal('Sorry, \'hat\' is not a user id.')
    expect(userRepository.findUser()).to.equal('Sorry, \'undefined\' is not a user id.')
  });
});