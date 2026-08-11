import { CANONICAL_HOSTS } from "@/config/constants";

/** True when the request Host is the public canonical site (not localhost/preview). */
export function isCanonicalHost(hostHeader: string | null): boolean {
  if (!hostHeader) return false;
  const host = hostHeader.split(":")[0]?.toLowerCase() ?? "";
  return (CANONICAL_HOSTS as readonly string[]).includes(host);
}
