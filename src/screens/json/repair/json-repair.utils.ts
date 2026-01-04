import { isBlank } from "@lichens-innovation/ts-common";
import { jsonrepair } from "jsonrepair";

/**
 * Attempts to repair malformed JSON string
 */
export const repairJson = (input: string): string => {
  if (isBlank(input)) {
    return "";
  }

  return jsonrepair(input);
};

interface GetResultMaxHeightArgs {
  isMobile: boolean;
  isTablet: boolean;
}

/**
 * Returns appropriate max height based on device type
 */
export const getResultMaxHeight = ({ isMobile, isTablet }: GetResultMaxHeightArgs): string => {
  if (isMobile) {
    return "300px";
  }

  if (isTablet) {
    return "400px";
  }

  return "500px";
};
