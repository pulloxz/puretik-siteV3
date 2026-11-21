import Link from "next/link";

// not-found receives no params, so the message is bilingual by design.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-7xl font-bold text-accent">404</p>
      <p className="text-xl">الصفحة غير موجودة · Page not found</p>
      <Link
        href="/ar"
        className="mt-2 rounded-full border border-border px-5 py-2 text-sm hover:bg-surface"
      >
        بيوريتك · PureTik
      </Link>
    </main>
  );
}
