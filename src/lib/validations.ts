import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "nameRequired"),
  email: z.string().email("emailInvalid"),
  message: z.string().min(10, "messageTooShort"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
