//Dependencies
const exceptionManager = require('./../shared/exceptions.shared');
const jwt = require('jsonwebtoken');
const UserModel = require('./../users/users.model');

//Const
const name = 'Login'

class LoginController {

  login(request, result) {
    const body = request.body;
    
    UserModel.findOne({ mail: body.email }).populate('role').exec((err, userValidate)=>{
      if(err){
        exceptionManager.connectionErrorData(result, name, err);
      }

      if(!userValidate) {
        exceptionManager.badRequestData(result, name);
      }

      const isValid = userValidate.comparePassword(body.password);

      if(!isValid){
        exceptionManager.forbiddenData(result, name);
      }

      delete userValidate.password;

      const token = jwt.sign({ user: userValidate }, 'hard_seed-code', { expiresIn: 14400 });

      const data = {token, user : userValidate};

      exceptionManager.acceptedLoginData(result, data);
      
    });
  }
}

const controller = new LoginController();

module.exports = controller;
