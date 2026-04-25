"use client";
import { useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function KeyValidator() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const key = searchParams.get("key");
    if (!key) return;

    fetch("/api/validate-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ encryptedKey: key }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          // Strip ?key= from URL, then re-render server components so hasAccess() sees the new cookie
          router.replace(pathname);
          router.refresh();
        }
      })
      .catch(() => {});
  }, [searchParams, pathname, router]);

  return null;
}
