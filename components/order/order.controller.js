//Dependencies
const exceptionManager = require('./../shared/exceptions.shared');
const getQueueData = require('../shared/queue.shared');
const azure = require('azure-storage');

// Model
const model = require('./order.model');
const productModel = require('./../products/products.model');
const name = 'Order';
const queueSvc = azure.createQueueService();

// Controller
class OrderController {

  getAll(request, result) {
    model.find({state: {$in: ["Pendiente", "Enviado","Entregado"]}}, '-id -v').populate('user', '-_id -_v').exec(
      async (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }

        for await (const order of response) {
          const currentOrder = await getQueueData(order.products);
          
          for (let i = 0; i < currentOrder.length; i++) {
            if(currentOrder[i] !== ''){
              const element = JSON.parse(currentOrder[i].content);
              let product = await productModel.findById(element.productId, '-id -_v');
  
              element.productId = product;
              currentOrder[i] = element;
            }
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

  getByUser(request, result){
    const userId = request.params.userid;

    model.find({user: userId}, '-id -v').populate('user', '-_id -_v').exec(
      async (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }

        for await (const order of response) {
          const currentOrder = await getQueueData(order.products);
          
          for (let i = 0; i < currentOrder.length; i++) {
            if(currentOrder[i] !== ''){
              const element = JSON.parse(currentOrder[i].content);
              let product = await productModel.findById(element.productId, '-id -_v');
  
              element.productId = product;
              currentOrder[i] = element;
            }
          }
          order.products = currentOrder;
        }

        exceptionManager.doneData(result, name, response);
      });
  }

  getOrdersUserState(request, result){
    const userId = request.params.id;
    
    model.find({
      user: userId,//admin sin esto solo busca x estado
      state: {$in:'Pendiente'} 
    }, '-id -v').populate('user', '-_id -_v').exec(
      async (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }

        for await (const order of response) {
          const currentOrder = await getQueueData(order.products);
          
          for (let i = 0; i < currentOrder.length; i++) {
            if(currentOrder[i] !== ''){
              const element = JSON.parse(currentOrder[i].content);
              let product = await productModel.findById(element.productId, '-id -_v');
  
              element.productId = product;
              currentOrder[i] = element;
            }
          }
          order.products = currentOrder;
        }

        exceptionManager.doneData(result, name, response);
      });
  }

  getOrdersUserCreated(request, result){
    const userId = request.params.id;
    
    model.find({
      user: userId,//admin sin esto solo busca x estado
      state: {$in:'Creado'} 
    }, '-id -v').populate('user', '-_id -_v').exec(
      async (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }

        for await (const order of response) {
          const currentOrder = await getQueueData(order.products);
          
          for (let i = 0; i < currentOrder.length; i++) {
            if(currentOrder[i] !== ''){
              const element = JSON.parse(currentOrder[i].content);
              let product = await productModel.findById(element.productId, '-id -_v');
  
              element.productId = product;
              currentOrder[i] = element;
            }
          }
          order.products = currentOrder;
        }

        exceptionManager.doneData(result, name, response);
      });
  }

  getOrdersUserSent(request, result){
    const userId = request.params.id;
    
    model.find({
      user: userId,//admin sin esto solo busca x estado
      state: {$in:'Enviado'} 
    }, '-id -v').populate('user', '-_id -_v').exec(
      async (err, response) => {
        if (err) {
          exceptionManager.connectionErrorData(result, name, err);
        }

        for await (const order of response) {
          const currentOrder = await getQueueData(order.products);
          
          for (let i = 0; i < currentOrder.length; i++) {
            if(currentOrder[i] !== ''){
              const element = JSON.parse(currentOrder[i].content);
              let product = await productModel.findById(element.productId, '-id -_v');
  
              element.productId = product;
              currentOrder[i] = element;
            }
          }
          order.products = currentOrder;
        }

        exceptionManager.doneData(result, name, response);
      });
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

  updateOrder(request, result) {
    const orderId = request.body.orderId;
    const productId = request.body.productId;
    const quantity = request.body.quantity;

  
    model.findById({_id: orderId}).exec(async (err, order) => {
      if (err) {
        exceptionManager.connectionErrorData(result, name, err);
      }

      if (!order) {
        exceptionManager.badRequestData(result, name);
      }
      
      const currentOrder = await getQueueData(order.products);
      
      for (let i = 0; i < currentOrder.length; i++) {
        if(currentOrder[i] !== ''){
          const element = JSON.parse(currentOrder[i].content);
          console.log('normal', element); 
          if (element.productId === productId) {
            element.quantity = quantity;

            const modified = JSON.stringify(element);
            queueSvc.updateMessage(
              order.products, 
              currentOrder[i].id, 
              currentOrder[i].popReceipt, 
              1,
              {messageText: modified}, 
              function(error, updateResults, updateResponse){
                if(!error){
                  exceptionManager.doneData(result, name, updateResults);
                }
              });
          }
          currentOrder[i] = element;
        }
      }
      
      console.log('modificado',currentOrder); 
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

  updateState(request, result){
    const id = request.params.id;
    const state = request.body.state;

    model.findById({_id: id}).exec((err, match) => {
      if(err){
        exceptionManager.connectionErrorData(result, name, err);
      }

      if(!match) {
        exceptionManager.doneData(result, name, match);
      }
      
      match.updateState(state);
      match.save(
        (err, updatedData) => {
          if (err) {
            exceptionManager.connectionErrorData(result, name, err);
          }
          exceptionManager.doneData(result, name, updatedData);
        });
    });
  }

  sendEmail(request, result){
    const id = request.params.id;
    
    
  }

  deleteProduct(request, result) {
    const orderId = request.params.id;
    const productId = request.body.productId;
  
    model.findById({_id: orderId}).exec(async (err, order) => {
      if (err) {
        exceptionManager.connectionErrorData(result, name, err);
      }

      if (!order) {
        exceptionManager.badRequestData(result, name);
      }
      
      const currentOrder = await getQueueData(order.products);
      
      for (let i = 0; i < currentOrder.length; i++) {
        if(currentOrder[i] !== ''){
          const element = JSON.parse(currentOrder[i].content);

          if (element.productId === productId) {
            queueSvc.deleteMessage(
              order.products, 
              currentOrder[i].id, 
              currentOrder[i].popReceipt,
              function(error, deleteResponse){
                if(!error){
                  exceptionManager.acceptedData(result, name);
                }
              });
          }
        }
      }
    });
  }
}

//Export
const controller = new OrderController();

module.exports = controller;