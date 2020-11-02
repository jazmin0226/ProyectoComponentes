//Dependencies
const exceptionManager = require('../shared/exceptions.shared');

// Model
const ProductModel = require('./products.model');

// Controller
class ProductController {

    getAllProducts (request, result){
        ProductModel.find({}).exec((err, response) => {
            if(err){
                exceptionManager.connectionErrorData(result, 'Product', err);
            }
            
            exceptionManager.doneData(result, 'User', response);
            
        })
    }

    getProductById (request, result){

    }

    registerProduct(request, result){
        const body = request.body;
        const newProduct = new ProductModel({
        });
    }

    updateProduct (request, result){

    }

    deleteProduct (request, result){

    }
}


//Export
const controller = new ProductController();

module.exports = controller;