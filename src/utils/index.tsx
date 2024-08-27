export function isEmpty<T>(value: T | null | undefined): boolean {
  if (value === null || value === undefined) return true;

  if (typeof value === 'string' && value.trim() === '') return true;

  if (Array.isArray(value) && value.length === 0) return true;

  if (typeof value === 'object' && Object.keys(value).length === 0) return true;

  return false;
}

export function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }