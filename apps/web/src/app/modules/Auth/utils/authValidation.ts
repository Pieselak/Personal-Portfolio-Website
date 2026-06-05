import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "identifierRequired"),
  password: z.string().min(1, "passwordRequired"),
});

export const registerSchema = z
  .object({
    username: z.string().trim().min(3, "username").max(80, "username"),
    email: z.string().trim().email("email").max(255, "email"),
    password: z.string().min(8, "passwordLength").max(128, "passwordLength"),
    confirmPassword: z.string().min(1, "passwordRequired"),
    acceptTerms: z.boolean().refine((value) => value, "terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwordMatch",
  });

export const resetPasswordSchema = z.object({
  email: z.string().trim().email("email"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export type AuthFieldErrors<T extends Record<string, unknown>> = Partial<
  Record<keyof T, string>
>;

export function getZodFieldErrors<T extends Record<string, unknown>>(
  schema: z.ZodType<T>,
  values: T,
  translateError: (code: string) => string,
): AuthFieldErrors<T> {
  const result = schema.safeParse(values);

  if (result.success) {
    return {};
  }

  const flattened = result.error.flatten().fieldErrors;

  return Object.entries(flattened).reduce<AuthFieldErrors<T>>(
    (errors, [field, messages]) => {
      const firstMessage = messages?.[0];

      if (firstMessage) {
        errors[field as keyof T] = translateError(firstMessage);
      }

      return errors;
    },
    {},
  );
}
