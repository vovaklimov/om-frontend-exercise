import * as z from 'zod';

export const createClientSchema = z.object({
  firstName: z.string().min(2, { message: 'Minimum 2 symbols required' }).max(255),
  lastName: z.string().min(2, { message: 'Minimum 2 symbols required' }).max(255),
  email: z.string().email(),
  birthDate: z.coerce.date().transform((date) => date.toISOString()),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
