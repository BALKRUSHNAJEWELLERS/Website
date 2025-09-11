// app/not-found.tsx  (App Router)
// OR pages/404.tsx   (Pages Router)

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! Page not found
      </p>
      <p className="mt-2 text-gray-500 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-2xl bg-blue-600 px-6 py-3 text-white text-lg font-medium shadow hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
