"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import type { ZodIssue } from "zod";

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;
type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");

  const [values, setValues] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validateField(field: keyof ContactFormData, value: string) {
    const partial = { ...values, [field]: value };
    const result = contactSchema.safeParse(partial);
    if (!result.success) {
      const fieldError = result.error.issues.find((e: ZodIssue) => e.path[0] === field);
      setErrors((prev) => ({
        ...prev,
        [field]: fieldError ? t(`errors.${fieldError.message}` as Parameters<typeof t>[0]) : undefined,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    validateField(name as keyof ContactFormData, value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((err: ZodIssue) => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = t(`errors.${err.message}` as Parameters<typeof t>[0]);
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      // POST to /api/contact — wire to Resend / Formspree / EmailJS
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4">
        <div className="w-10 h-px bg-[var(--color-accent)]" />
        <p className="text-[var(--color-foreground)] text-lg">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 w-full">
      {/* Name */}
      <Field
        id="name"
        label={t("name")}
        placeholder={t("namePlaceholder")}
        value={values.name}
        error={errors.name}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        autoComplete="name"
      />

      {/* Email */}
      <Field
        id="email"
        label={t("email")}
        placeholder={t("emailPlaceholder")}
        value={values.email}
        error={errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        autoComplete="email"
      />

      {/* Message */}
      <Field
        id="message"
        label={t("message")}
        placeholder={t("messagePlaceholder")}
        value={values.message}
        error={errors.message}
        onChange={handleChange}
        onBlur={handleBlur}
        isTextarea
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start px-8 py-3 bg-[var(--color-accent)] text-black text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "sending" ? t("sending") : t("send")}
      </button>

      {status === "error" && (
        <p className="text-red-400 text-sm" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  autoComplete?: string;
  isTextarea?: boolean;
}

function Field({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  isTextarea = false,
}: FieldProps) {
  const inputClass = `w-full bg-transparent border-b border-[var(--color-border)] py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 text-sm`;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs text-[var(--color-muted)] uppercase tracking-[0.2em]"
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={inputClass}
        />
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
