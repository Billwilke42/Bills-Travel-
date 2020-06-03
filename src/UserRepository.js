/* eslint-disable max-len */
class UserRepository {
    constructor(travelers) {
      this.travelers = this.checkIfDataIsArray(travelers)
      this.users = [];
    }
  
    checkIfDataIsArray(data) {
      return data instanceof Array ? data : "Error, data for user\'s cannot be found."
    }
  
    findUser(id) {
      return id === Number(id) ? this.travelers.find((user) => user.id === id) : `Sorry, '${id}' is not a user id.`
    }
  }
  
  export default UserRepository;