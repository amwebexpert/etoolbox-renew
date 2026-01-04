// Spec http://www.ecma-international.org/ecma-262/6.0/#sec-json.stringify
const sortObjectKeys = (_key: string, value: unknown): unknown =>
  value instanceof Object && !(value instanceof Array)
    ? Object.keys(value as Record<string, unknown>)
        .sort()
        .reduce(
          (sorted, key) => {
            sorted[key] = (value as Record<string, unknown>)[key];
            return sorted;
          },
          {} as Record<string, unknown>,
        )
    : value;

interface FormatJsonArgs {
  value?: string;
  space: number;
}

export const formatJson = ({ value, space }: FormatJsonArgs): string => {
  if (!value) {
    return "";
  }

  try {
    const obj: unknown = JSON.parse(value);
    return JSON.stringify(obj, sortObjectKeys, space);
  } catch {
    // Do nothing, user may still be typing...
    return value;
  }
};

interface PrettifyJsonArgs {
  value?: string;
}

export const prettifyJson = ({ value }: PrettifyJsonArgs): string => {
  return formatJson({ value, space: 4 });
};

interface MinifyJsonArgs {
  value?: string;
}

export const minifyJson = ({ value }: MinifyJsonArgs): string => {
  return formatJson({ value, space: 0 });
};

interface IsMinifiedArgs {
  value: string;
}

export const isMinified = ({ value }: IsMinifiedArgs): boolean => {
  const minified = minifyJson({ value });
  return value === minified;
};
