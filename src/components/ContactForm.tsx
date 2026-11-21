"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import {
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/validate-contact";

const EMPTY: ContactInput = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

type FieldProps = {
  name: keyof ContactInput;
  label: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  dir?: "ltr";
  half?: boolean;
};

export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [done, setDone] = useState(false);

  const fields: FieldProps[] = [
    { name: "firstName", label: t.form.firstName, half: true, required: true },
    { name: "lastName", label: t.form.lastName, half: true },
    { name: "company", label: t.form.company },
    { name: "email", label: t.form.email, type: "email", dir: "ltr", required: true },
    { name: "phone", label: t.form.phone, type: "tel", dir: "ltr" },
    { name: "message", label: t.form.message, multiline: true, required: true },
  ];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      // Front-end only for now: nothing is sent anywhere yet.
      setDone(true);
      setValues(EMPTY);
    }
  }

  if (done) {
    return (
      <div
        role="status"
        className="flex min-h-72 flex-col items-center justify-center gap-4 text-center"
      >
        <CheckCircle2 className="h-14 w-14 text-accent" aria-hidden="true" />
        <p className="max-w-xs text-lg">{t.form.success}</p>
      </div>
    );
  }

  const base =
    "w-full rounded-xl border bg-bg px-4 py-3.5 text-base text-fg outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-x-5 gap-y-5 sm:grid-cols-2"
    >
      {fields.map((f) => {
        const err = errors[f.name];
        const id = `contact-${f.name}`;
        const cls = `${base} ${err ? "border-red-400" : "border-fg/20"}`;
        const common = {
          id,
          name: f.name,
          value: values[f.name],
          required: f.required,
          "aria-invalid": !!err,
          "aria-describedby": err ? `${id}-err` : undefined,
          dir: f.dir,
          className: cls,
          onChange: (
            ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => setValues((v) => ({ ...v, [f.name]: ev.target.value })),
        };
        return (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            <label htmlFor={id} className="mb-2 block text-sm font-medium">
              {f.label}
              {f.required && <span className="text-accent"> *</span>}
            </label>
            {f.multiline ? (
              <textarea rows={5} {...common} />
            ) : (
              <input type={f.type ?? "text"} {...common} />
            )}
            {err && (
              <p id={`${id}-err`} className="mt-1.5 text-xs text-red-400">
                {t.errors[err]}
              </p>
            )}
          </div>
        );
      })}
      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-gradient-to-r from-accent to-lime px-10 py-4 text-lg font-semibold text-black transition hover:scale-[1.02] sm:col-span-2 rtl:bg-gradient-to-l"
      >
        {t.form.submit}
      </button>
    </form>
  );
}
