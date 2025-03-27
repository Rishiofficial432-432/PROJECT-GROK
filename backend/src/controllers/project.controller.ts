import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateProjectInput, UpdateProjectInput } from '../models/project.model';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const projectController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const data = CreateProjectInput.parse(req.body);

      const project = await prisma.project.create({
        data: {
          ...data,
          userId,
        },
      });

      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const projects = await prisma.project.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
      });

      res.json(projects);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const project = await prisma.project.findFirst({
        where: { id, userId },
      });

      if (!project) {
        throw new AppError(404, 'Project not found');
      }

      res.json(project);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const data = UpdateProjectInput.parse(req.body);

      const project = await prisma.project.update({
        where: { id_userId: { id, userId } },
        data,
      });

      res.json(project);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      await prisma.project.delete({
        where: { id_userId: { id, userId } },
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};