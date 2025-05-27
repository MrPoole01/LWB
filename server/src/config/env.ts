import { z } from 'zod';

const envSchema = z.object({
  // Server Configuration
  PORT: z.string().transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // Email Configuration
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string().min(1),
  ADMIN_EMAIL: z.string().email(),

  // Frontend URL
  FRONTEND_URL: z.string().url(),

  // Security
  JWT_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().url(),

  // API Configuration
  API_PREFIX: z.string().startsWith('/'),
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