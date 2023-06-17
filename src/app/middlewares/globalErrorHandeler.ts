/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler, NextFunction } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handelValidationError from '../../errors/handelValidationError';
import ApiError from '../../errors/ApiError';
import { errorlogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handelZodError from '../../errors/handelZodError';
import handelCastError from '../../errors/handelCastError';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandelar: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('globalErrorHandler ', error)
    : errorlogger.error('globalErrorHandler ', error);

  let statusCode = 500;
  let message = 'Somting went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];
  console.log('this is global handel errors');

  if (error?.name === 'ValidationError') {
    const simplifiedError = handelValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handelZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error.name === 'CastError') {
    const simplifiedError = handelCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandelar;
