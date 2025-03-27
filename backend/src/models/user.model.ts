
import { z } from 'zod';
import { Role } from '@prisma/client';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  role: z.nativeEnum(Role),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
});

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;