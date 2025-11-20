import { z } from 'zod';

const foodSchema = z.object({
    id: z.number(),
    name: z.string().min(1, 'Name must be at least 1 character long'),
    price: z.number().positive('Price must be a positive number'),
    description: z.string().min(1, 'Description must be at least 1 character long'),
    image: z.string(),
    created: z.string(),
    updated: z.string(),
});

export type Food = z.infer<typeof foodSchema>;

export const foodCreateRequestSchema = z.object({
    name: z.string().min(2, 'Name must be at least 1 character long'),
    price: z.number().positive('Price must be a positive number'),
    description: z.string().min(2, 'Description must be at least 1 character long'),
    image: z.string().optional(),
})

export type FoodCreateRequest = z.infer<typeof foodCreateRequestSchema>;
