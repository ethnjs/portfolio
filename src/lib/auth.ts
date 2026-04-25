import { cookies } from "next/headers";

// Server component — reads httpOnly cookie set by the API route
export async function hasAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("portfolio_access")?.value === "1";
}

// Client component — reads the non-httpOnly fallback (document.cookie)
// Note: portfolio_access is httpOnly so this always returns false in the browser.
// Gating logic should live in server components via hasAccess().
export function hasAccessClient(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("portfolio_access=1"));
}
