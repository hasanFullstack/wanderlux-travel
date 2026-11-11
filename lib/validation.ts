export type ContactValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const contactFieldOrder: (keyof ContactValues)[] = [
  "name",
  "email",
  "phone",
  "service",
  "message",
];

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

/** Pure client-side validation for the contact form. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email, e.g. you@example.com.";

  const digits = phone.replace(/\D/g, "").length;
  if (phone && (!PHONE_RE.test(phone) || digits < 7 || digits > 15)) {
    errors.phone = "Please enter a valid phone number, e.g. +92 300 1234567.";
  }

  if (!values.service) errors.service = "Please choose a service.";

  if (!message) errors.message = "Please tell us a little about your trip.";
  else if (message.length < MESSAGE_MIN)
    errors.message = `Please write at least ${MESSAGE_MIN} characters (${message.length}/${MESSAGE_MIN}).`;
  else if (message.length > MESSAGE_MAX)
    errors.message = `Please keep it under ${MESSAGE_MAX} characters.`;

  return errors;
}
