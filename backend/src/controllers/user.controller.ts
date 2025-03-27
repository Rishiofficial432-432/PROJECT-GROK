import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { CreateUserInput, UpdateUserInput } from '../models/user.model';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = CreateUserInput.parse(req.body);
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: '24h',
      });

      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new AppError(401, 'Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new AppError(401, 'Invalid credentials');
      }

      const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: '24h',
      });

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new AppError(404, 'User not found');
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const data = UpdateUserInput.parse(req.body);

      const user = await prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};