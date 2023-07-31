import { SetMetadata } from '@nestjs/common';

export const IS_CUSTOMER_KEY = 'isCustomer';
export const Customer = () => SetMetadata(IS_CUSTOMER_KEY, true);
