import * as z from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
    username: z.string().min(2, {message: 'Too short'}),
    email: z.string().min(2, {message: 'Too short'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
    
})