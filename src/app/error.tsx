"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main id="main-content" className="mx-auto max-w-lg px-6 py-20">
    <h1 className="text-3xl font-semibold">This page could not be loaded</h1>
    <p className="mt-4">Please try again in a moment.</p>
    <button type="button" onClick={reset} className="mt-6 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground">Try again</button>
  </main>;
}
