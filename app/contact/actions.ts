"use server";

import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const { name, email, message } = validatedFields.data;

  // SIMULATION: Sending email to a.muse@rapidmuse.com
  console.log(`--- SENDING EMAIL ---`);
  console.log(`To: a.muse@rapidmuse.com`);
  console.log(`From: ${name} <${email}>`);
  console.log(`Message: ${message}`);
  console.log(`---------------------`);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Thank you! Your message has been sent to our sales team.",
  };
}
