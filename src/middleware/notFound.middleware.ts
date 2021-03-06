import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line
export const notFoundHandler = (request: Request, response: Response, next: NextFunction): void => {
  const message = 'Resource not found';
  response.status(404).send(message);
};
