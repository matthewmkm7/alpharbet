"use client";

import { FormEvent, useState } from "react";

export default function WaitlistForm({
  idSuffix = "",
  className = "",
}: {
  idSuffix?: string;
  className?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Waitlist signup (not yet connected to a backend):", email);
    setSubmitted(true);
  }

  return (
    <div className={className}>
      {!submitted && (
        <>
          <form className="hero-form" onSubmit={handleSubmit}>
            <input
              type="email"
              id={`emailInput${idSuffix}`}
              placeholder="you@school.edu"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Join waitlist
            </button>
          </form>
          <div className="form-note">
            Free while in beta. No spam, unsubscribe anytime.
          </div>
        </>
      )}
      {submitted && (
        <div className="form-success is-visible">
          You&apos;re on the list. We&apos;ll email you when early access opens.
        </div>
      )}
    </div>
  );
}
