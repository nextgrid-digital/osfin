"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "pending" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const fieldClassName =
  "not-typeset w-full border border-black/15 bg-transparent px-4 py-3 font-[family-name:var(--font-sans)] text-[16px] leading-[1.4] text-black outline-none transition placeholder:text-black/35 focus:border-black/40";

const labelClassName =
  "not-typeset mb-2 block font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function readUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
  const out: Record<string, string> = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  return out;
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Work email is required.";
    else if (!isValidEmail(email.trim())) next.email = "Enter a valid work email.";
    if (!message.trim()) next.message = "Message is required.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setErrorMessage("");
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("pending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          role: role.trim(),
          message: message.trim(),
          pageUrl: window.location.href,
          referrer: document.referrer || "",
          ...readUtmParams(),
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setRole("");
      setMessage("");
      setErrors({});
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="not-typeset border border-black/15 px-6 py-10 md:px-8 md:py-12" data-not-typeset>
        <p className="!m-0 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase">
          Sent
        </p>
        <p className="!mb-0 !mt-4 max-w-[28rem] font-[family-name:var(--font-crimson)] text-[clamp(1.5rem,2.4vw,28px)] leading-[1.15] font-light tracking-[-0.02em] text-black">
          Thanks — we’ll follow up shortly.
        </p>
        <button
          type="button"
          className="btn-primary not-typeset mt-8 inline-flex h-10 items-center rounded-none border-0 bg-black px-5 text-[13px] font-medium tracking-[-0.02em] text-white uppercase transition hover:opacity-90"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="not-typeset flex flex-col gap-5" data-not-typeset onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="contact-name" className={labelClassName}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={fieldClassName}
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          disabled={status === "pending"}
        />
        {errors.name ? <p className="!mb-0 !mt-2 text-[13px] text-black/55">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClassName}>
          Work email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClassName}
          placeholder="you@company.com"
          aria-invalid={Boolean(errors.email)}
          disabled={status === "pending"}
        />
        {errors.email ? <p className="!mb-0 !mt-2 text-[13px] text-black/55">{errors.email}</p> : null}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-company" className={labelClassName}>
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className={fieldClassName}
            placeholder="Company"
            disabled={status === "pending"}
          />
        </div>
        <div>
          <label htmlFor="contact-role" className={labelClassName}>
            Role
          </label>
          <input
            id="contact-role"
            name="role"
            autoComplete="organization-title"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className={fieldClassName}
            placeholder="Optional"
            disabled={status === "pending"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${fieldClassName} min-h-[9rem] resize-y`}
          placeholder="What are you looking to solve?"
          aria-invalid={Boolean(errors.message)}
          disabled={status === "pending"}
        />
        {errors.message ? (
          <p className="!mb-0 !mt-2 text-[13px] text-black/55">{errors.message}</p>
        ) : null}
      </div>

      {status === "error" && errorMessage ? (
        <p className="!m-0 text-[14px] leading-[1.4] text-black/70" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "pending"}
          className="btn-primary not-typeset inline-flex h-10 items-center rounded-none border-0 bg-black px-5 text-[13px] font-medium tracking-[-0.02em] text-white uppercase transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "pending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
