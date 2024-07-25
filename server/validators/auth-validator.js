const z = require("zod");

// Creating an object schema for login
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(45, { message: "Email must be at most 45 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at least 7 characters" })
    .max(100, { message: "Password must be at most 100 characters" }),
});

// Creating an object schema for signup
const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(25, { message: "Username must be at most 25 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(10, { message: "Phone must be at most 10 characters" }),
});

module.exports = { signupSchema, loginSchema };
