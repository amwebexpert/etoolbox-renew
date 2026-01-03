interface Base64ToBlobArgs {
  base64: string;
  mimeType: string;
}

export const base64ToBlob = ({ base64, mimeType }: Base64ToBlobArgs): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

interface DownloadBlobArgs {
  blob: Blob;
  fileName: string;
}

export const downloadBlob = ({ blob, fileName }: DownloadBlobArgs): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

interface DownloadBase64AsFileArgs {
  base64: string;
  mimeType: string;
  fileName: string;
}

export const downloadBase64AsFile = ({ base64, mimeType, fileName }: DownloadBase64AsFileArgs): void => {
  const blob = base64ToBlob({ base64, mimeType });
  downloadBlob({ blob, fileName });
};

interface FormatDataUriArgs {
  mimeType: string;
  base64: string;
}

export const formatDataUri = ({ mimeType, base64 }: FormatDataUriArgs): string => {
  return `data:${mimeType};base64,${base64}`;
};

import prettyBytes from "pretty-bytes";

export interface Base64FileResult {
  base64: string;
  mimeType: string;
}

export const getBase64ApproxSize = (base64: string): number => {
  return Math.round((base64.length * 3) / 4);
};

export const formatBase64Size = (base64: string): string => {
  return prettyBytes(getBase64ApproxSize(base64));
};

export const readFileAsBase64 = (file: File): Promise<Base64FileResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Extract base64 part (after the data:mimetype;base64, prefix)
      const base64 = result.split(",")[1] || result;
      const mimeType = file.type || "application/octet-stream";
      resolve({ base64, mimeType });
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
};

export const copyToClipboard = async (text: string): Promise<void> => {
  await navigator.clipboard.writeText(text);
};
