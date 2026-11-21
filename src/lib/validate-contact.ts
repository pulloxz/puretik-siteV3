export type ContactInput = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactErrorCode = "required" | "invalidEmail" | "invalidPhone";
export type ContactErrors = Partial<Record<keyof ContactInput, ContactErrorCode>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS = /^[+\d\s\-()]+$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (!input.firstName.trim()) errors.firstName = "required";

  const email = input.email.trim();
  if (!email) errors.email = "required";
  else if (!EMAIL.test(email)) errors.email = "invalidEmail";

  const phone = input.phone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!PHONE_CHARS.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = "invalidPhone";
    }
  }

  if (!input.message.trim()) errors.message = "required";

  return errors;
}
