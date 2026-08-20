import { generateToken } from '../../src/utils/jwt.utils.js';

export const tokenCustomer = generateToken({
  userId: '6a8678b22872806fb7c949ef',
  role: 'customer',
});
export const tokenOrganizer = generateToken({
  userId: '6a85c293fc96df45b8a628f6',
  role: 'organizer',
});
