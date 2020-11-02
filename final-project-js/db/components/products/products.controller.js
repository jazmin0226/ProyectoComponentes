//Dependencies
const exceptionManager = require('../shared/exceptions.shared');

// Model
const ProductModel = require('./products.model');

// Controller
class ProductController {

    getAllProducts (request, result){
        ProductModel.find({state: true}).exec((err, response) => {
            if(err){
                exceptionManager.connectionErrorData(result, 'Product', err);
            }
        
            exceptionManager.doneData(result, 'Product', response);
            
        })
    }

    getProductById (request, result){

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

    }
}


//Export
const controller = new ProductController();

module.exports = controller;