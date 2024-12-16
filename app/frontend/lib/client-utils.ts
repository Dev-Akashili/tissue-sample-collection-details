/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Converts an object into a query string.
 *
 * Iterates over the object properties, encoding and combining with '&' to form a query string.
 *
 * @param obj - The object to be converted into a query string.
 * @returns A string representing the query.
 */
export function objToQuery(obj: { [key: string]: any }): string {
  if (Object.keys(obj).length === 0) return "";
  let query = "";
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key as keyof typeof obj];
      if (value !== undefined) {
        if (query.length > 0) {
          query += "&";
        }
        query += `${key}=${encodeURIComponent(value)}`;
      }
    }
  }
  return query;
}
