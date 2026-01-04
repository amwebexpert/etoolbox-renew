import { getErrorMessage, isBlank } from "@lichens-innovation/ts-common";

import { useToastMessage } from "~/providers/toast-message-provider";
import { copyTextToClipboard } from "~/utils/clipboard.utils";

interface CopyToClipboardArgs {
  text: string | undefined | null;
  successMessage?: string;
}

export const useClipboardCopy = () => {
  const messageApi = useToastMessage();

  const copyToClipboard = async ({ text, successMessage = "Copied to clipboard!" }: CopyToClipboardArgs) => {
    if (isBlank(text)) return;

    try {
      await copyTextToClipboard(text);
      messageApi.success(successMessage);
    } catch (e: unknown) {
      messageApi.error("Failed to copy to clipboard: " + getErrorMessage(e));
    }
  };

  return copyToClipboard;
};

