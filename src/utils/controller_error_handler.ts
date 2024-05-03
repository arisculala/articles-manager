import { Response } from 'express';
import { HttpStatusCode } from '../lib/httpstatus';
import { StandardError } from './standard_error';

// define an interface for the error object
interface ErrorResponse {
  code: string;
  status: HttpStatusCode;
  message: string;
  details?: any;
}

class ControllerErrorHandler {
  static handleErrorResponse(res: Response, error: any): void {
    let errorResponse;
    if (error instanceof StandardError) {
      errorResponse = {
        code: error.code,
        status: error.status,
        message: error.message,
        details: error.details,
      };
    } else {
      errorResponse = {
        status: HttpStatusCode.InternalServerError,
        message:
          'The server encountered an error and could not complete your request.',
        details: error.message,
      };
    }
    res.status(errorResponse.status).json(errorResponse);
  }
}

export default ControllerErrorHandler;
