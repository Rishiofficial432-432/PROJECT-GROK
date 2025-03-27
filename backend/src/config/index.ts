import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  port: z.string().default('3000'),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  mongoUri: z.string(),
  jwtSecret: z.string(),
  corsOrigins: z.array(z.string()).default(['http://localhost:5173']),
});

// Validate environment variables
const config = configSchema.parse({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
});

export { config };