const {User} = require('../models/index');

class UserRepository {
    async create(data){
        try {
          const response = await User.create(data);
          return response;
        } catch (error) {
          console.log("something went wrong inside repository layer");
          throw { error };
        }
    }

    async destroy(id) {
        try {
          await this.newModel.destroy({ where: { id } });
          return true;
        } catch (error) {
          console.log("something went wrong inside repository layer");
          throw { error };
        }
      }
}

module.exports = UserRepository