import { HttpStatusCode } from '../lib/httpstatus';

export class StandardError extends Error {
  code: string;
  status: HttpStatusCode;
  message: string;
  details?: [any];
  error?: any;

  constructor({
    code,
    status,
    message,
    details,
    error,
  }: {
    code: string;
    status: HttpStatusCode;
    message: string;
    details?: [any];
    error?: unknown;
  }) {
    super();
    this.code = code;
    this.status = status;
    this.message = message;
    this.details = details;
    if (error instanceof Error) {
      // Check if error is an instance of Error
      this.details = [
        {
          message: error.message,
        },
      ];
    }
  }
}
