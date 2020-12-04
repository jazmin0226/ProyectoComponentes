//Dependencies
const exceptionManager = require('./../shared/exceptions.shared');
const azure = require('azure-storage');
const {
  QueueClient,
  QueueServiceClient
} = require("@azure/storage-queue");

// Model
const model = require('./order.model');
const name = 'Order';
const queueSvc = azure.createQueueService();

// Controller
class OrderController {

  getAll(request, result) {
    model.find({}, '-_id -__v').populate('user').exec(
      (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }

        queueSvc.getQueueMetadata('5fc741fff10be514d8e9481c-products', function (error, results, response) {
          if (!error) {
            let queueLenght = results.approximateMessageCount;
            console.log(queueLenght);
            console.log('-------------------');
            queueSvc.getMessages('5fc741fff10be514d8e9481c-products', {
              numOfMessages: queueLenght,
              visibilityTimeout: 5 * 60
            }, function (error, results, getResponse) {
              if (!error) {
                for (let index in results) {
                  let message = results[index].messageText;
                  console.log('message: ', message);

                }
              }
            });
          }
        });
      });
  }


  getById(request, result) {
    const id = request.params.id;

    model.find('-_id -__v').populate('user').exec(
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