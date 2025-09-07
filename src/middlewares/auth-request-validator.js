const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password){
      return res.status(400).json({
      data: {},
      success: false,
      message: "Something went wrong.",
      error: "email or password is missing.",
    });
    }
    next();
}

const validIsAdminRequest = (req,res,next) => {
  if(!req.body.id){
    return res.status(400).json({
      data: {},
      success: false,
      message: "Something went wrong.",
      error: "userid is missing.",
    });
  }
  next();
}
module.exports = {
    validateUserAuth,
    validIsAdminRequest
}