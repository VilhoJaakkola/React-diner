import { z } from 'zod';

const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(100),
    email: z.string().email("Must be a valid email address"),
    password: z.string().min(8).max(100),
    admin: z.boolean().default(false),
    created_at: z.string(),
    updated_at: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userSignupSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1).max(100),
    email: z.string().email("Must be a valid email address"),
    password: z.string().min(8).max(100),
    admin: z.boolean().default(false).optional(),
});

export type UserCreateRequest = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
    email: z.string().email("Must be a valid email address"),
    password: z.string().min(8).max(100),
});

export type UserLoginRequest = z.infer<typeof userLoginSchema>;
