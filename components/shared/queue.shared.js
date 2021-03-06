//Dependencies
const azure = require('azure-storage');

// Consts
const queueSvc = azure.createQueueService();

async function getQueueData(queueId) {
  return new Promise(resolve => {
    const productData = [];

    queueSvc.getQueueMetadata(queueId,
      function (error, results, response) {

        if (!error) {
          const queueLenght = results.approximateMessageCount;
          const getQueueData = {
            numOfMessages: queueLenght,
            visibilityTimeout: 1
          }

          queueSvc.getMessages(queueId, getQueueData,
            function (error, results, getResponse) {
              if (!error) {
                for (let index in results) {
                  const message = {
                    id: results[index].messageId,
                    content: results[index].messageText,
                    popReceipt: results[index].popReceipt
                  };
                  productData.push(message);
                }
                resolve(productData);
              }
            });
        }
      });
  });
}

module.exports = getQueueData;