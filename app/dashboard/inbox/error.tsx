'use client';
import { FaceFrownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Some kind of error with inbox</p>
      <Link
        href="/dashboard"
        className="bg-green-logo mt-4 rounded-md px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
