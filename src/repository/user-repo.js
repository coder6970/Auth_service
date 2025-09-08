const { StatusCodes } = require("http-status-codes");
const { User, Role } = require("../models/index");
const ClientError = require("../utils/client-error");
const ValdiationError = require('../utils/validation-error')
class UserRepository {
  async create(data) {
    try {
      const response = await User.create(data);
      return response;
    } catch (error) {
      if(error.name === "SequelizeValidationError"){
        throw new ValdiationError(error);
      }
      console.log("something went wrong inside repository layer");
      throw { error };
    }
  }

  async destroy(id) {
    try {
      await User.destroy({ where: { id } });
      return true;
    } catch (error) {
      console.log("something went wrong inside repository layer");
      throw { error };
    }
  }
  async getById(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("something went wrong inside repository layer");
      throw { error };
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if(!user){
        throw new ClientError(
          'AttributeNotFound',
          'Invalid email sent in the request',
          'Please check the email as there is no record of the email.',
          StatusCodes.NOT_FOUND
        )
      }
      return user;
    } catch (error) {
      console.log("something went wrong inside repository layer");
      throw { error };
    }
  }

  async isAdmin(id) {
    try {
      const user = await User.findByPk(id);
      const admin = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(admin);
    } catch (error) {
      console.log("something went wrong inside repository layer");
      throw { error };
    }
  }
}

module.exports = UserRepository;
