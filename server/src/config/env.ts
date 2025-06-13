import { z } from 'zod';

const envSchema = z.object({
  // Server Configuration
  PORT: z.string().transform(Number).optional().default('3001'),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),

  // Email Configuration (optional for development)
  EMAIL_USER: z.string().email().optional(),
  EMAIL_PASS: z.string().min(1).optional(),
  ADMIN_EMAIL: z.string().email().optional().default('info@lw-builders.com'),

  // Optional configurations
  FRONTEND_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(1).optional(),
  CORS_ORIGIN: z.string().url().optional(),
  API_PREFIX: z.string().optional().default('/api'),
});

type EnvError = {
  path: string;
  message: string;
};

export const validateEnv = () => {
  try {
    const env = envSchema.parse(process.env);
    return { success: true as const, env };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const missingVars: EnvError[] = error.errors.map((err: z.ZodIssue) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      console.error('Environment validation failed:');
      missingVars.forEach(({ path, message }: EnvError) => {
        console.error(`- ${path}: ${message}`);
      });
    }
    return { success: false as const, error };
  }
};

export type Env = z.infer<typeof envSchema>; 