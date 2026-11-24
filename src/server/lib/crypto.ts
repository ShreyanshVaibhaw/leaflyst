import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

// AES-256-GCM. Stored form: base64(iv).base64(tag).base64(ciphertext).
function key(raw: string | undefined): Buffer {
  if (!raw) throw new Error("ENCRYPTION_KEY is not set");
  const k = Buffer.from(raw, "base64");
  if (k.length !== 32) throw new Error("ENCRYPTION_KEY must be 32 bytes, base64 encoded");
  return k;
}

export function encrypt(plain: string, rawKey: string | undefined): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(rawKey), iv);
  const body = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), body].map((b) => b.toString("base64")).join(".");
}

export function decrypt(stored: string, rawKey: string | undefined): string {
  const [iv, tag, body] = stored.split(".").map((p) => Buffer.from(p, "base64"));
  if (!iv || !tag || !body) throw new Error("malformed ciphertext");
  const decipher = createDecipheriv("aes-256-gcm", key(rawKey), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(body), decipher.final()]).toString("utf8");
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}
