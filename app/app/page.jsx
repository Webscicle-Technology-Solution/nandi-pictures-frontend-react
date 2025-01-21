'use client'; // This line is needed for using hooks in this file

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const pathname = window.location.pathname;

  useEffect(() => {
    // Check if the user is on "/app" or any path starting with "/app/"
    if (pathname === "/app" || pathname === "/app/") {
      // Redirect to "/app/home"
      router.push("/app/home");
    }
  }, [pathname, router]);

  return null; // No content to display
}
