const UserService = require("../services/user-service");
const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully registered a user",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      data: {},
      success: false,
      message: "Something went wrong in the user controller",
      err: error.description,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await userService.destroy(req.params.id);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully deleted the user",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong in the user controller",
      error: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully signin the user",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong in the user controller",
      error: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-header"]; 
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      data: response,
      success: true,
      message: "User is authenticated and user is valid",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong in the user controller",
      error: error,
    });
  }
};

const isAdmin = async (req,res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    //this will hit only if you have assigned role to user ie in the user_roles table there is data otherwise catch block will hit
    return res.status(200).json({
      data: response,
      success: true,
      message: "User's admin role is verified.",
      error: {},
    });
  } catch (error) {
     console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong in the user controller",
      error: error,
    });
  }
}

module.exports = {
  create,
  destroy,
  signIn,
  isAuthenticated,
  isAdmin
};
