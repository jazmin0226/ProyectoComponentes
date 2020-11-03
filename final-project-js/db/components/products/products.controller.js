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
        const id = request.params.id;

        ProductModel.find({id: id, state: true}).exec(
            (err, response) => {
            if(err){
                exceptionManager.connectionErrorData(result, 'Product', err);
            }
            exceptionManager.doneData(result, 'Product', response);
        })
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
        const id = request.params.id;
        const body = request.body;

       ProductModel.find({id: id}).exec((err, matchProducts) => {
           const matchProduct = matchProducts[0];

           if (err) {
               exceptionManager.connectionErrorData(result, 'Product', err);
           }

           if (!matchProduct) {
               exceptionManager.badRequestData(result, 'Product');
           }

           matchProduct.updateData(body);

           matchProduct.save((saveErr, updateProduct) => {
               if (saveErr) {
                   exceptionManager.connectionErrorData(result, 'Product', saveErr);
               }
               exceptionManager.doneData(result, 'Product', updateProduct);
           })
       })
    }

    deleteProduct (request, result){
        const id = request.params.id;
        const body = request.body;

       ProductModel.find({id: id}).exec((err, matchProducts) => {
        const matchProduct = matchProducts[0];

        //matchProduct.deleteData(body);
       })
    }
}


//Export
const controller = new ProductController();

module.exports = controller;