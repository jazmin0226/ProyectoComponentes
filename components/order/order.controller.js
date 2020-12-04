//Dependencies
const exceptionManager = require('./../shared/exceptions.shared');
const getQueueData = require('../shared/queue.shared');
const azure = require('azure-storage');

// Model
const model = require('./order.model');
const productModel = require('./../products/products.model')
const name = 'Order';
const queueSvc = azure.createQueueService();

// Controller
class OrderController {

  getAll(request, result) {
    model.find({}, '-id -v').populate('user', '-_id -_v').exec(
      async (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }

        for await (const order of response) {
          const currentOrder = await getQueueData(order.products);

          for (let i = 0; i < currentOrder.length; i++) {
            const element = JSON.parse(currentOrder[i]);
            let product = await {productModel}.findById(element.productId, '-id -_v');

            element.productId = product;
            currentOrder[i] = element;
          }

          order.products = currentOrder;
        }

        exceptionManager.doneData(result, name, response);

      });
  }


  getById(request, result) {
    const id = request.params.id;

    model.find('-id -_v').populate('user').exec(
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
    newData.products = `${newData._id}-products`;

    newData.save(
      (err, createdData) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }

        queueSvc.createQueueIfNotExists(newData.products, function (error, results, response) {
          if (!error) {
            exceptionManager.createdData(result, name, createdData);
          }
        });


      });
  }

  update(request, result) {
    const id = request.params.id;
    const body = request.body;

    model.findById(id).exec((err, match) => {
      if (err) {
        exceptionManager.connectionErrorData(result, name, err);
      }

      if (!match) {
        exceptionManager.badRequestData(result, name);
      }

      console.log(body.id);
      queueSvc.createMessage(match.products, body.id, function (error, results, response) {
        if (!error) {
          // Message inserted
        }
      });
      // match.updateData(body);

      // match.save((saveErr, updateData) => {
      //   if (saveErr) {
      //     exceptionManager.connectionErrorData(result, name, saveErr);
      //   }
      //   exceptionManager.doneData(result, name, updateData);
      // })
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