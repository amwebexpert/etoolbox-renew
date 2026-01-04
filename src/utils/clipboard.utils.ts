/**
 * Copies text to the system clipboard
 */
export const copyTextToClipboard = async (text: string): Promise<void> => {
  await navigator.clipboard.writeText(text);
};

