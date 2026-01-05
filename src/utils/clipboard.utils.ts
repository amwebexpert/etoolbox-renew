export const copyTextToClipboard = async (text: string): Promise<void> => {
  await navigator.clipboard.writeText(text);
};

/**
 * Copies an image from a data URL to the clipboard
 */
export const copyImageToClipboard = async (dataUrl: string): Promise<void> => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();

  // Convert to PNG if needed for clipboard compatibility
  const pngBlob = blob.type === "image/png" ? blob : await convertToPngBlob(dataUrl);

  await navigator.clipboard.write([new ClipboardItem({ "image/png": pngBlob })]);
};

/**
 * Converts a data URL to a PNG blob for clipboard compatibility
 */
const convertToPngBlob = async (dataUrl: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Could not convert to PNG"));
          }
        },
        "image/png",
        1,
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
};

