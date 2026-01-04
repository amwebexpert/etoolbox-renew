interface SaveJsonAsArgs {
  content: string;
  fileName?: string;
}

/**
 * Downloads JSON content as a file
 */
export const saveJsonAs = ({ content, fileName = "data.json" }: SaveJsonAsArgs): void => {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

