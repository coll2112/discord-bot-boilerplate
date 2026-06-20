export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const uniqueStrings = (values: string[]): string[] =>
  Array.from(new Set(values.map((value) => value.trim()))).filter(
    (value) => value.length > 0
  );
