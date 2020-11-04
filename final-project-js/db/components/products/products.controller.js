//Dependencies
const exceptionManager = require('./../shared/exceptions.shared');

// Model
const ProductModel = require('./products.model');

// Controller
class ProductController {

  name = 'Product';
  model = ProductModel;

  getAll(request, result) {
    this.model.find({
      state: true
    }).exec(
      (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, this.name, err);
        }
        exceptionManager.doneData(result, this.name, response);
      });
  }

  getById(request, result) {
    const id = request.params.id;

    this.model.find({
      id: id,
      state: true
    }).exec((err, response) => {
      if (err) {
        exceptionManager.connectionErrorData(result, this.name, err);
      }
      exceptionManager.doneData(result, this.name, response);
    });
  }

  register(request, result) {
    const body = request.body;
    const newProduct = new this.model(body);

    newProduct.save((err, createdProduct) => {
      if (err) {
        exceptionManager.connectionErrorData(result, this.name, err);
      }
      exceptionManager.createdData(result, this.name, createdProduct);
    });
  }

  update(request, result) {
    const id = request.params.id;
    const body = request.body;

    this.model.find({
      id: id
    }).exec((err, matchProducts) => {
      const matchProduct = matchProducts[0];

      if (err) {
        exceptionManager.connectionErrorData(result, this.name, err);
      }

      if (!matchProduct) {
        exceptionManager.badRequestData(result, this.name);
      }

      matchProduct.updateData(body);

      matchProduct.save((saveErr, updateProduct) => {
        if (saveErr) {
          exceptionManager.connectionErrorData(result, this.name, saveErr);
        }
        exceptionManager.doneData(result, this.name, updateProduct);
      });
    });
  }

  delete(request, result) {
    const id = request.params.id;

    this.model.find({
      id: id
    }).exec((err, matchProducts) => {
      const matchProduct = matchProducts[0];

      if (err) {
        exceptionManager.connectionErrorData(result, this.name, err);
      }

      if (!matchProduct) {
        exceptionManager.badRequestData(result, this.name);
      }

      matchProduct.updateState(false);

      exceptionManager.doneData(result, this.name, matchProduct);
    });
  }
}


//Export
const controller = new ProductController();

module.exports = controller;