const UserRepository = require("../repository/user-repo");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/serverconfig');
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

  createToken(user){
    try {
      const result = jwt.sign(user,JWT_KEY,{expiresIn : '1d'});
      return result;
    } catch (error) {
      console.log("Something went wrong in the token creation.");
      throw error
    }
  }

  verifyToken(token){
    try {
      const response =  jwt.verify(token,JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in the token verifivation.",error);
      throw error;
    }
  }
  verifyPassword(userPlainInputPassword,ecryptedPassword){
    try {
      return bcrypt.compareSync(userPlainInputPassword,ecryptedPassword);
    } catch (error) {
      console.log("Something went wrong in the password verification.");
      throw error;
    }
  }
}

module.exports = UserService