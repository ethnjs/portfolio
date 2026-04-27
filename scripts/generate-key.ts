import { createHash, randomBytes, createCipheriv } from "crypto";
import { createInterface } from "readline";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(question: string): Promise<string> {
  return new Promise((res) => rl.question(question, res));
}

function encrypt(plaintext: string, secret: string): string {
  const key = createHash("sha256").update(secret).digest();
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return `${iv.toString("hex")}:${ciphertext.toString("hex")}`;
}

async function main() {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) {
    console.error("❌  ENCRYPTION_SECRET not found in .env.local");
    process.exit(1);
  }

  const label   = await ask("Label for this key (e.g. recruiter-google): ");
  const expires = await ask("Expiration date (YYYY-MM-DD): ");
  rl.close();

  const plainKey     = `ethan_${randomBytes(4).toString("hex")}`;
  const encryptedKey = encrypt(plainKey, secret);

  console.log(`
✅  Key generated!

Label:     ${label}
Plain key: ${plainKey}
Expires:   ${expires}

Add this entry to PORTFOLIO_KEYS in Vercel:
${JSON.stringify({ key: plainKey, expires })}

Shareable URL:
https://ethanshih.com?key=${encodeURIComponent(encryptedKey)}
`);
}

main();
