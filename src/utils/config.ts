import { z } from 'zod';

const configSchema = z.object({
  NEXT_PUBLIC_SERVER_API: z.string(),
  NEXT_PUBLIC_BASE_API: z.string()
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_SERVER_API: process.env.NEXT_PUBLIC_SERVER_API,
  NEXT_PUBLIC_BASE_API: process.env.NEXT_PUBLIC_BASE_API
})

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error('Have some env variable is not available');
}

const envConfig = configProject.data;

export default envConfig;