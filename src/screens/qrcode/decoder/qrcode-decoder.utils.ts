import { getErrorMessage } from "@lichens-innovation/ts-common";
import jsQR from "jsqr";

import type { DecodeFromFileContext, QRCodeDecodeResult } from "./qrcode-decoder.types";

const fileToImageData = (file: File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(img.src);
      resolve(imageData);
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
  });
};

const decodeFromImageData = (imageData: ImageData): QRCodeDecodeResult => {
  const { data, width, height } = imageData;
  const result = jsQR(data, width, height, { inversionAttempts: "attemptBoth" });

  if (!result) {
    throw new Error("No QR code found in the image");
  }

  return {
    text: result.data,
    format: "QR_CODE",
    timestamp: new Date(),
  };
};

export const decodeFromFile = async ({ file }: DecodeFromFileContext): Promise<QRCodeDecodeResult> => {
  try {
    const imageData = await fileToImageData(file);
    return decodeFromImageData(imageData);
  } catch (e: unknown) {
    throw new Error(`Failed to decode QR code: ${getErrorMessage(e)}`);
  }
};

export const formatDecodeResult = (result: QRCodeDecodeResult): string => {
  const { text, format, timestamp } = result;
  return JSON.stringify({ text, format, timestamp: timestamp.toISOString() }, null, 2);
};

const VALID_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp"];

export const isValidImageFile = (file: File): boolean => {
  return VALID_TYPES.includes(file.type);
};
