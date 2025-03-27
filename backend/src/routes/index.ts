import { Router } from 'express';
import { z } from 'zod';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Example protected route
router.get('/protected', async (req, res, next) => {
  try {
    // This is where you would check authentication
    throw new AppError(401, 'Authentication required');
  } catch (error) {
    next(error);
  }
});

export default router;