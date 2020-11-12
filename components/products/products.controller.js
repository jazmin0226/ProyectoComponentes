//Dependencies
const exceptionManager = require('./../shared/exceptions.shared');

// Model
const model = require('./products.model');
const name = 'Product';

// Controller
class ProductController {
  
  getAll(request, result) {
    model.find({
      state: true
    }, '-_id -__v -state').exec(
      (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }
        exceptionManager.doneData(result, name, response);
      });
  }

  getById(request, result) {
    const id = request.params.id;

    model.find({
      id: id,
      state: true
    }, '-_id -__v').exec((err, response) => {
      if (err) {
        exceptionManager.connectionErrorData(result, name, err);
      }
      exceptionManager.doneData(result, name, response);
    });
  }

  register(request, result) {
    const body = request.body;
    const newProduct = new model(body);

    newProduct.save((err, createdProduct) => {
      if (err) {
        exceptionManager.connectionErrorData(result, name, err);
      }
      exceptionManager.createdData(result, name, createdProduct);
    });
  }

  update(request, result) {
    const id = request.params.id;
    const body = request.body;

    model.find({
      id: id
    }).exec((err, matchProducts) => {
      const matchProduct = matchProducts[0];

      if (err) {
        exceptionManager.connectionErrorData(result, name, err);
      }

      if (!matchProduct) {
        exceptionManager.badRequestData(result, name);
      }

      matchProduct.updateData(body);

      matchProduct.save((saveErr, updateProduct) => {
        if (saveErr) {
          exceptionManager.connectionErrorData(result, name, saveErr);
        }
        exceptionManager.doneData(result, name, updateProduct);
      });
    });
  }

  delete(request, result) {
    const id = request.params.id;

    model.find({
      id: id
    }).exec((err, matchProducts) => {
      const matchProduct = matchProducts[0];

      if (err) {
        exceptionManager.connectionErrorData(result, name, err);
      }

      if (!matchProduct) {
        exceptionManager.badRequestData(result, name);
      }

      matchProduct.updateState(false);

      exceptionManager.doneData(result, name, matchProduct);
    });
  }
}


//Export
const controller = new ProductController();

module.exports = controller;