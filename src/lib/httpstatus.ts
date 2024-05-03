// define HTTP status codes and their corresponding names
export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  Found = 302,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Conflict = 409,
  InternalServerError = 500,
  NotImplemented = 501,
  ServiceUnavailable = 503,
}

export const HttpStatusName: Record<number, string> = {
  [HttpStatusCode.OK]: 'OK',
  [HttpStatusCode.Created]: 'Created',
  [HttpStatusCode.Accepted]: 'Accepted',
  [HttpStatusCode.NoContent]: 'No Content',
  [HttpStatusCode.Found]: 'Found',
  [HttpStatusCode.BadRequest]: 'Bad Request',
  [HttpStatusCode.Unauthorized]: 'Unauthorized',
  [HttpStatusCode.Forbidden]: 'Forbidden',
  [HttpStatusCode.NotFound]: 'Not Found',
  [HttpStatusCode.MethodNotAllowed]: 'Method Not Allowed',
  [HttpStatusCode.Conflict]: 'Conflict',
  [HttpStatusCode.InternalServerError]: 'Internal Server Error',
  [HttpStatusCode.NotImplemented]: 'Not Implemented',
  [HttpStatusCode.ServiceUnavailable]: 'Service Unavailable',
};
