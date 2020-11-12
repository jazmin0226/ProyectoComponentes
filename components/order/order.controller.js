//Dependencies
const exceptionManager = require('./../shared/exceptions.shared');

// Model
const model = require('./order.model');
const name = 'Order';

// Controller
class OrderController {

  getAll(request, result) {
    model.find({
      state: true
    }, '-_id -__v').populate('product').exec(
      (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }
        exceptionManager.doneData(result, name, response);
      })
  }

  getById(request, result) {
    const id = request.params.id;

    model.find({
      id: id,
      state: true
    }, '-_id -__v').populate('user').populate('product').exec(
      (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }
        exceptionManager.doneData(result, name, response);
      })
  }

  register(request, result) {
    const body = request.body;
    const newData = new model(body);

    newData.save(
      (err, createdData) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }
        exceptionManager.createdData(result, name, createdData);
      });
  }

  update(request, result) {
    const id = request.params.id;
    const body = request.body;

    model.find({
      id: id
    }).exec((err, matchs) => {
      const match = matchs[0];

      if (err) {
        exceptionManager.connectionErrorData(result, name, err);
      }


      if (!match) {
        exceptionManager.badRequestData(result, name);
      }

      match.updateData(body);

      match.save((saveErr, updateData) => {
        if (saveErr) {
          exceptionManager.connectionErrorData(result, name, saveErr);
        }
        exceptionManager.doneData(result, name, updateData);
      })
    });
  }

  delete(request, result) {
    const id = request.params.id;

    model.find({
      id: id
    }).exec((err, matchs) => {
      const match = matchs[0];

      if (err) {
        exceptionManager.connectionErrorData(result, name, err);
      }


      if (!match) {
        exceptionManager.badRequestData(result, name);
      }

      match.updateState(false);

      exceptionManager.doneData(result, name, match);

    });
  }
}


//Export
const controller = new OrderController();

module.exports = controller;