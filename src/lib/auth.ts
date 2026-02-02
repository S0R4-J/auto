import { headers } from "next/headers";

export async function checkAuth() {
  const headersList = await headers();
  const auth = headersList.get("authorization");

  if (!auth) return false;

  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic") return false;

  const decoded = Buffer.from(encoded, "base64").toString();
  const [user, pass] = decoded.split(":");

  const adminUser = process.env.ADMIN_USER || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "admin";

  return user === adminUser && pass === adminPass;
}
