import { HttpStatus } from '@nestjs/common';

export const successResponse = <T>(message: string, data: T) => ({
  statusCode: HttpStatus.OK,
  message,
  data,
});
