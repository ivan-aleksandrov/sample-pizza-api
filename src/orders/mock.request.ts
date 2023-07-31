import { Request } from 'express';

export const createMockRequest = (overrides?: Partial<Request>): Request => {
  return {
    user: {
      role: 'admin',
    },
    ...overrides, // This allows you to override any default values with custom ones for your test
  } as Request;
};
