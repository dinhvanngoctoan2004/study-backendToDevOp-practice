import { z } from 'zod';

const location = z.object({
  name: z.string().trim(),
  address: z.string().trim(),
  city: z.string().trim(),
});

const ticketCategories = z.object({
  name: z.string().trim(),
  price: z.number().min(0),
  totalQuantity: z.number().min(1),
  availableQuantity: z.number().min(0),
});

export const addAndEditEvent = z
  .object({
    title: z.string().trim(),
    slug: z.string().toLowerCase().trim(),
    organizerId: z
      .string()
      .trim()
      .regex(/^[a-fA-F0-9]{24}$/, 'organizerId phải là MongoDB ObjectId hợp lệ'),
    location: location,
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    ticketCategories: z.array(ticketCategories),
    status: z.enum(['draft', 'published', 'completed', 'cancelled']).default('draft'),
  })
  .refine((data) => data.endTime > data.startTime, {
    path: ['endTime'],
    message: 'endTime must be after startTime.',
  })
  .refine(
    (data) => data.ticketCategories.every((cat) => cat.availableQuantity <= cat.totalQuantity),
    { path: ['ticketCategories'], message: 'availableQuantity must not exceed totalQuantity' },
  );

export type AddAndEditEvent = z.infer<typeof addAndEditEvent>;
