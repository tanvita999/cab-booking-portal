"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-pink-50">
        <div className="text-center">
          <div className="text-4xl mb-3">🚕</div>

          <p className="text-lg font-semibold text-purple-700">
            Checking login...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
