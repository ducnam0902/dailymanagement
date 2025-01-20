import { z } from "zod";

const configSchema = z.object({
  VITE_BASE_SERVER: z.string(),
});

const configProject = configSchema.safeParse({
  VITE_BASE_SERVER: import.meta.env.VITE_BASE_SERVER,
});

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error("Have some env variable is not available");
}

const envConfig = configProject.data;

export default envConfig;
