const UserRepository = require("../repository/user-repo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AppError = require('../utils/error-code')
const { JWT_KEY } = require("../config/serverconfig");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const response = await this.userRepository.create(data);
      return response;
    } catch (error) {
      if(error.name === 'SequelizeValidationError')throw error;
      console.log("something went wrong in the user service");
      throw new AppError(
        'Server Error',
        'Something went wrong in the service layer',
        'Logical Issue',
        500
      );
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

  async signIn(userEmail, userPassword) {
    try {
      const user = await this.userRepository.getByEmail(userEmail);
      const passwordMatch = this.verifyPassword(userPassword,user.password);
      if (!passwordMatch) {
        console.log("Password do not match.");
        throw { error: "Incorrect Password" };
      }
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("something went wrong in the user service");
      throw error;
    }
  }
  async isAuthenticated(token){
    try {
      const response = this.verifyToken(token);
      if(!response){
        throw {error : 'Invalid token'}
      }
      const user = await this.userRepository.getById(response.id);
      return user.id;
    } catch (error) {
      if(error.name === 'AttributeNotFound')throw error;
      console.log("Something went wrong in the auth process.");
      throw error;
    }
  }
  createToken(user) {
    try { 
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in the token creation.");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token,JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in the token verification.", error);
      throw error;
    }
  }
  verifyPassword(userPlainInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userPlainInputPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in the password verification.");
      throw error;
    }
  }
  isAdmin(id){
     try {
      return this.userRepository.isAdmin(id);
    } catch (error) {
      console.log("Something went wrong in the inAdmin.");
      throw error;
    }
  }
}

module.exports = UserService;
