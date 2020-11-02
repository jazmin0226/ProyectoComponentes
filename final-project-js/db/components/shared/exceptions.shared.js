class Exceptions {

    constructor() { }
  
    connectionErrorData(response, dataType, err) {
      const errorData = {
        state: true,
        data: `Error ${dataType} request`,
        err
      };
      return response.status(500).json(errorData);
    }
  
    doneData(response, dataType, newData) {
      const messageData = {
        state: true,
        data: `${dataType} request`,
        newData
      };
      return response.status(200).json(messageData);
    }
  
    createdData(response, dataType, newData) {
      const messageData = {
        state: true,
        data: `${dataType} created`,
        newData
      };
      return response.status(201).json(messageData);
    }
  
    acceptedData(response, dataType) {
      const errorData = {
        state: true,
        data: `Accepted ${dataType} request`
      };
      return response.status(202).json(errorData);
    }
  
    noneAutoricedData(response, dataType) {
      const errorData = {
        state: false,
        data: `Non Autoriced ${dataType} request`
      };
      return response.status(203).json(errorData);
    }
  
    badRequestData(response, dataType) {
      const errorData = {
        state: false,
        data: `Bad request ${dataType}`
      };
      return response.status(400).json(errorData);
    }
  
    unauthorizedData(response, dataType) {
      const errorData = {
        state: false,
        data: `UnAuthorized ${dataType} request`
      };
      return response.status(401).json(errorData);
    }
  
    forbiddenData(response, dataType) {
      const errorData = {
        state: false,
        data: `Invalid ${dataType} request`
      };
      return response.status(403).json(errorData);
    }
  
    missingData(response, dataType) {
      const errorData = {
        state: false,
        data: `${dataType} not found`
      };
      return response.status(404).json(errorData);
    }
  }
  
  const exceptionsManager = new Exceptions();
  
  module.exports = exceptionsManager;