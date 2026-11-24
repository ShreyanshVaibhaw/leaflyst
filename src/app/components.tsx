"use client";

import { useActionState, useEffect, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import type { ActionState } from "./actions";

export function SubmitButton({
  children,
  primary,
  small,
  disabled,
}: {
  children: ReactNode;
  primary?: boolean;
  small?: boolean;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`btn${primary ? " btn-primary" : ""}${small ? " btn-sm" : ""}`}
      disabled={pending || disabled}
      aria-busy={pending}
    >
      {pending ? "Working..." : children}
    </button>
  );
}

/** A form bound to a server action that returns ActionState, with the result shown below it. */
export function ActionForm({
  action,
  children,
  className,
}: {
  action: (state: ActionState, form: FormData) => Promise<ActionState>;
  children: ReactNode;
  className?: string;
}) {
  const [state, formAction] = useActionState(action, {});
  return (
    <form action={formAction} className={className}>
      {children}
      {state.error ? (
        <p
          className="notice notice-error small"
          role="alert"
          style={{ flexBasis: "100%", marginTop: 8 }}
        >
          {state.error}
        </p>
      ) : null}
      {state.message ? (
        <p
          className="notice notice-ok small"
          role="status"
          style={{ flexBasis: "100%", marginTop: 8 }}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

/** Refreshes server data every few seconds while something is running. */
export function AutoRefresh({ active, everyMs = 3000 }: { active: boolean; everyMs?: number }) {
  const router = useRouter();
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => router.refresh(), everyMs);
    return () => clearInterval(t);
  }, [active, everyMs, router]);
  return null;
}
