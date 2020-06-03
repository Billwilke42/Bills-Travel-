/* eslint-disable max-len */
class DataRepository {
    constructor(travelers) {
      if(travelers instanceof Array) {
        this.travelers = travelers
      }
    }
  
    findUser(id) {
      return id === Number(id) ? this.travelers.find((user) => user.id === id) : `Sorry, '${id}' is not a user id.`
    }
  }
  
  export default DataRepository;