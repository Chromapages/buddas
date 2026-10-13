export default function NotFoundPage() {
  return <main id="main-content" className="mx-auto max-w-lg px-6 py-20">
    <h1 className="text-3xl font-semibold">Page not found</h1>
    <p className="mt-4">This restaurant page may be unavailable or unpublished.</p>
    <a href="/" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground">Back to home</a>
  </main>;
}
