import type { RgbaColor } from "./color-picker.store";

interface ClickCoordinates {
  px: number;
  py: number;
  width: number;
  height: number;
}

export const getOpacityHexValue = (opacity: number): string => {
  if (opacity < 0 || opacity > 1) {
    throw new Error("Invalid opacity value");
  }

  return Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  if (r > 255 || g > 255 || b > 255) {
    throw new Error("Invalid color component");
  }

  return ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
};

export const rgbaColorToHex = (color: RgbaColor): string => {
  return "#" + rgbToHex(color.r, color.g, color.b);
};

export const rgbaColorToHexWithAlpha = (color: RgbaColor): string => {
  return rgbaColorToHex(color) + getOpacityHexValue(color.a);
};

export const rgbaColorToRgbString = (color: RgbaColor): string => {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
};

export const rgbaColorToRgbaString = (color: RgbaColor): string => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

interface ComputeImageClickCoordinatesArgs {
  event: MouseEvent;
  image: HTMLImageElement;
}

export const computeImageClickCoordinates = ({ event, image }: ComputeImageClickCoordinatesArgs): ClickCoordinates => {
  const bounds = image.getBoundingClientRect();

  // Use clientX/clientY (relative to viewport) to match getBoundingClientRect()
  // pageX/pageY includes scroll offset which causes incorrect positioning
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  const cw = image.clientWidth;
  const ch = image.clientHeight;
  const iw = image.naturalWidth;
  const ih = image.naturalHeight;

  const px = Math.round((x / cw) * iw);
  const py = Math.round((y / ch) * ih);

  return {
    px,
    py,
    width: iw,
    height: ih,
  };
};

interface RetrieveClickedColorArgs {
  event: MouseEvent;
  image: HTMLImageElement;
}

export const retrieveClickedColor = ({ event, image }: RetrieveClickedColorArgs): RgbaColor => {
  const coordinates = computeImageClickCoordinates({ event, image });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  canvas.width = coordinates.width;
  canvas.height = coordinates.height;
  context.drawImage(image, 0, 0);

  const p = context.getImageData(coordinates.px, coordinates.py, 1, 1).data;

  return {
    r: p[0] ?? 0,
    g: p[1] ?? 0,
    b: p[2] ?? 0,
    a: 1,
  };
};

interface ClipboardToDataURLArgs {
  items: DataTransferItemList;
  onLoad: (result: string) => void;
}

export const clipboardToDataURL = ({ items, onLoad }: ClipboardToDataURLArgs): void => {
  if (!items) {
    return;
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.type.startsWith("image")) continue;

    const file = item.getAsFile();
    if (!file) continue;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        onLoad(result);
      }
    };
    reader.readAsDataURL(file);
    break;
  }
};

export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export interface ColorFormat {
  label: string;
  value: string;
  backgroundColor: string;
}

export const getColorFormats = (color: RgbaColor): ColorFormat[] => {
  const hex = rgbaColorToHex(color);
  const hexWithAlpha = rgbaColorToHexWithAlpha(color);
  const rgb = rgbaColorToRgbString(color);
  const rgba = rgbaColorToRgbaString(color);

  return [
    { label: "HEX", value: hex, backgroundColor: hex },
    { label: "HEX + Alpha", value: hexWithAlpha, backgroundColor: hexWithAlpha },
    { label: "RGB", value: rgb, backgroundColor: rgb },
    { label: "RGBA", value: rgba, backgroundColor: rgba },
  ];
};
