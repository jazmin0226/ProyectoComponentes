//Dependencies
const exceptionManager = require('../shared/exceptions.shared');

// Model
const UserModel = require('./user.model');

// Controller
class UserController {

    getAllUsers (request, result){
        UserModel.find({state: true}).exec((err, response) => {
            if(err){
                exceptionManager.connectionErrorData(result, 'User', err);
            }
        
            exceptionManager.doneData(result, 'User', response);
            
        })
    }

    /*getUserById (request, result){

    }

    registerProduct(request, result){
        const body = request.body;
        const newProduct = new ProductModel({
            name: body.name,
            color: body.color,
            description: body.description
        });

        newProduct.save(
            (err, createdProduct) => {
                if (err) {
                    exceptionManager.connectionErrorData(result, 'Product', err);
                }
                exceptionManager.createdData(result, 'Product', err);
            }
        );
    }

    updateProduct (request, result){

    }

    deleteProduct (request, result){

    }*/
}


//Export
const controller = new UserController();

module.exports = controller;