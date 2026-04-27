import { NextRequest, NextResponse } from "next/server";
import { createDecipheriv, createHash } from "crypto";
import { encryptAccessToken } from "@/lib/auth";

type KeyEntry = { key: string; expires: string };

function derivedKey(): Buffer {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) throw new Error("ENCRYPTION_SECRET is not set");
  return createHash("sha256").update(secret).digest();
}

function decrypt(encryptedKey: string): string {
  const [ivHex, ciphertextHex] = encryptedKey.split(":");
  if (!ivHex || !ciphertextHex) throw new Error("Invalid encrypted key format");
  const iv = Buffer.from(ivHex, "hex");
  const ciphertext = Buffer.from(ciphertextHex, "hex");
  const decipher = createDecipheriv("aes-256-cbc", derivedKey(), iv);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}

export async function POST(req: NextRequest) {
  try {
    const { encryptedKey } = await req.json();
    const plainKey = decrypt(encryptedKey);

    const keys: KeyEntry[] = JSON.parse(process.env.PORTFOLIO_KEYS ?? "[]");
    const match = keys.find((k) => k.key === plainKey);
    if (!match) return NextResponse.json({ valid: false }, { status: 401 });

    const today = new Date().toISOString().split("T")[0];
    if (match.expires < today) return NextResponse.json({ valid: false }, { status: 401 });

    const res = NextResponse.json({ valid: true });
    res.cookies.set("portfolio_access", encryptAccessToken(), {
      httpOnly: true,
      maxAge: 3600,
      path: "/",
      sameSite: "lax",
    });
    return res;
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
