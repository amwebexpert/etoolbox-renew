import { getErrorMessage, isBlank } from "@lichens-innovation/ts-common";
import QRCode from "qrcode";

import type { GenerateQRCodeContext, QRCodeOptions } from "./qrcode-generator.types";

/**
 * Generates a QR code as a data URL
 */
export const generateQRCode = async ({ text, options }: GenerateQRCodeContext): Promise<string> => {
  if (isBlank(text)) {
    throw new Error("Text content is required to generate a QR code");
  }

  try {
    const dataUrl = await QRCode.toDataURL(text, options);
    return dataUrl;
  } catch (e: unknown) {
    throw new Error(`Failed to generate QR code: ${getErrorMessage(e)}`);
  }
};

/**
 * Generates the HTML img tag for the QR code
 */
export const generateImgTag = (dataUrl: string): string => {
  return `<img alt="QR Code" src="${dataUrl}"/>`;
};

/**
 * Downloads the QR code image
 */
interface DownloadQRCodeArgs {
  dataUrl: string;
  filename?: string;
}

export const downloadQRCode = ({ dataUrl, filename = "qrcode" }: DownloadQRCodeArgs): void => {
  const extension = dataUrl.includes("image/png") ? "png" : dataUrl.includes("image/jpeg") ? "jpg" : "webp";

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `${filename}.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Formats options as pretty JSON for display
 */
export const formatOptionsAsJson = (options: QRCodeOptions): string => {
  return JSON.stringify(options, null, 2);
};

/**
 * Parses JSON string to QRCodeOptions
 */
export const parseOptionsFromJson = (json: string): QRCodeOptions => {
  try {
    return JSON.parse(json) as QRCodeOptions;
  } catch {
    throw new Error("Invalid JSON format for QR code options");
  }
};

/**
 * Validates QR code options
 */
export const validateOptions = (options: QRCodeOptions): string[] => {
  const errors: string[] = [];

  if (options.width < 50 || options.width > 1000) {
    errors.push("Width must be between 50 and 1000 pixels");
  }

  if (options.margin < 0 || options.margin > 10) {
    errors.push("Margin must be between 0 and 10");
  }

  if (options.quality < 0 || options.quality > 1) {
    errors.push("Quality must be between 0 and 1");
  }

  return errors;
};

/**
 * Estimates the QR code capacity based on error correction level
 */
interface GetCapacityInfoArgs {
  errorCorrectionLevel: QRCodeOptions["errorCorrectionLevel"];
}

interface CapacityInfo {
  numeric: number;
  alphanumeric: number;
  bytes: number;
}

export const getCapacityInfo = ({ errorCorrectionLevel }: GetCapacityInfoArgs): CapacityInfo => {
  // Version 40 (highest) capacity by error correction level
  const capacities: Record<QRCodeOptions["errorCorrectionLevel"], CapacityInfo> = {
    L: { numeric: 7089, alphanumeric: 4296, bytes: 2953 },
    M: { numeric: 5596, alphanumeric: 3391, bytes: 2331 },
    Q: { numeric: 3993, alphanumeric: 2420, bytes: 1663 },
    H: { numeric: 3057, alphanumeric: 1852, bytes: 1273 },
  };

  return capacities[errorCorrectionLevel];
};

