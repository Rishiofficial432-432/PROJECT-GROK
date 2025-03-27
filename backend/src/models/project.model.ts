import { z } from 'zod';
import { Status } from '@prisma/client';

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.nativeEnum(Status),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.nativeEnum(Status).optional(),
});

export const UpdateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.nativeEnum(Status).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;