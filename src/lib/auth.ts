import { cookies } from "next/headers";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

function derivedKey(): Buffer {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) throw new Error("ENCRYPTION_SECRET is not set");
  return createHash("sha256").update(secret).digest();
}

// Produces an AES-256-CBC encrypted token stored in the cookie.
// Forging a valid token requires knowing ENCRYPTION_SECRET.
export function encryptAccessToken(): string {
  const iv = randomBytes(16);
  const payload = JSON.stringify({ v: 1, ts: Date.now() });
  const cipher = createCipheriv("aes-256-cbc", derivedKey(), iv);
  const ct = Buffer.concat([cipher.update(payload, "utf8"), cipher.final()]);
  return `${iv.toString("hex")}:${ct.toString("hex")}`;
}

function verifyAccessToken(token: string): boolean {
  try {
    const [ivHex, ctHex] = token.split(":");
    if (!ivHex || !ctHex) return false;
    const iv = Buffer.from(ivHex, "hex");
    const ct = Buffer.from(ctHex, "hex");
    const decipher = createDecipheriv("aes-256-cbc", derivedKey(), iv);
    const plain = Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8");
    const payload = JSON.parse(plain);
    return payload?.v === 1;
  } catch {
    return false;
  }
}

// Server component — decrypts and verifies the httpOnly cookie
export async function hasAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("portfolio_access")?.value;
  if (!token) return false;
  return verifyAccessToken(token);
}
