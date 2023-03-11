"use strict";
const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: "Success",
  CREATED: "Created",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metaData = {},
  }) {
    this.message = message ? message : reasonStatusCode;
    this.status = statusCode;
    this.metaData = metaData;
  }

  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metaData }) {
    super({ message, metaData });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message,
    options={},
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metaData = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metaData })
    this.options = options
  }
}
module.exports = {
  OK,
  CREATED,
};
