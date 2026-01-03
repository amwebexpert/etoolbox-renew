export const encodeBase64 = (text: string): string => {
  try {
    // Handle unicode characters properly
    const bytes = new TextEncoder().encode(text);
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
    return btoa(binString);
  } catch {
    return "Error: Unable to encode";
  }
};

export const decodeBase64 = (base64: string): string => {
  try {
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, (char) => char.codePointAt(0) ?? 0);
    return new TextDecoder().decode(bytes);
  } catch {
    return "Error: Invalid Base64 string";
  }
};

