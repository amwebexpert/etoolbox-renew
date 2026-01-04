export const encodeUrl = (value?: string): string => {
  if (!value) {
    return "";
  }
  return encodeURIComponent(value);
};

export const decodeUrl = (value?: string): string => {
  if (!value) {
    return "";
  }
  try {
    return decodeURIComponent(value);
  } catch {
    // If decoding fails, return the original value
    return value;
  }
};

interface TransformUrlArgs {
  value?: string;
  decode?: boolean;
}

export const transformUrl = ({ value, decode }: TransformUrlArgs): string => {
  if (decode) {
    return decodeUrl(value);
  }
  return encodeUrl(value);
};
