export interface Profile {
  name: string;
}
function readJson(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function readProfile(): Profile | null {
  const value = readJson("dcnm-profile");
  return isRecord(value) && typeof value.name === "string" && value.name.trim()
    ? { name: value.name.slice(0, 30) }
    : null;
}

export function saveLocal(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeProfile(): void {
  try {
    localStorage.removeItem("dcnm-profile");
  } catch {
    /* The current session can still sign out. */
  }
}
