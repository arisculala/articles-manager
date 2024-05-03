import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationResult } from 'joi';
import { HttpStatusCode } from '../lib/httpstatus';

// Define a type for the validation schemas
interface ValidationSchemas {
  body?: Joi.Schema;
  headers?: Joi.Schema;
  query?: Joi.Schema;
  params?: Joi.Schema;
}

// Middleware for Express validation
const expressValidation =
  (schemas: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Validate request body if schema is provided
    if (schemas.body) {
      const bodyValidationResult: ValidationResult = schemas.body.validate(
        req.body,
      );
      if (bodyValidationResult.error) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: HttpStatusCode.BadRequest,
          message: 'Bad Request: Validation error',
          details: bodyValidationResult.error.details,
        });
      }
    }

    // Validate request headers if schema is provided
    if (schemas.headers) {
      const headersValidationResult: ValidationResult =
        schemas.headers.validate(req.headers);
      if (headersValidationResult.error) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: HttpStatusCode.BadRequest,
          message: 'Bad Request: Validation error',
          details: headersValidationResult.error.details,
        });
      }
    }

    // Validate request query if schema is provided
    if (schemas.query) {
      const queryValidationResult: ValidationResult = schemas.query.validate(
        req.query,
      );
      if (queryValidationResult.error) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: HttpStatusCode.BadRequest,
          message: 'Bad Request: Validation error',
          details: queryValidationResult.error.details,
        });
      }
    }

    // Validate request params if schema is provided
    if (schemas.params) {
      const paramsValidationResult: ValidationResult = schemas.params.validate(
        req.params,
      );
      if (paramsValidationResult.error) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: HttpStatusCode.BadRequest,
          message: 'Bad Request: Validation error',
          details: paramsValidationResult.error.details,
        });
      }
    }

    next(); // Move to the next middleware
  };

export default expressValidation;
