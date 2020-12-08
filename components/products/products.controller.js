//Dependencies
const exceptionManager = require('./../shared/exceptions.shared');
const sendEmail = require('./../shared/email.shared');

// Model
const model = require('./products.model');
const name = 'Product';

// Controller 
class ProductController {
  
  getAll(request, result) {
    model.find({
      state: true}, '-id -__v -state').exec(
      (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }

        sendEmail({
          to: 'guzmanmaria2775@gmail.com',
          subject: 'test',
          text: 'test'
        })
        exceptionManager.doneData(result, name, response);
      });
  }

  getById(request, result) {
    const id = request.params.id;

    model.findById(id, '-__v').exec((err, response) => {
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

    model.findById(id).exec((err, matchProduct) => {
      console.log(matchProduct);

      if (err) {
        exceptionManager.connectionErrorData(result, name, err);
      }

      if (!matchProduct) {
        exceptionManager.badRequestData(result, name);
      }

      for (const key in body) {
        const currentData = body[key];
        matchProduct[key] = currentData;
      }

      //matchProduct.updateData(body);

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