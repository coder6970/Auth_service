const UserRepository = require("../repository/user-repo");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const response = await this.userRepository.create(data);
      return response;
    } catch (error) {
      console.log("something went wrong in the user service");
      throw error;
    }
  }

  async destroy(id) {
    try {
      const response = await this.userRepository.destroy(id);
      return response;
    } catch (error) {
      console.log("something went wrong in the user service");
      throw error;
    }
  }
}

module.exports = UserService