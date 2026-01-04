import { isBlank, isNullish } from "@lichens-innovation/ts-common";

// Types
export interface RegexTestResult {
  highlightedHtml: string;
  extractedValues: string;
  matchCount: number;
  uniqueCount: number;
  error: string | null;
}

// Constants
export const DEFAULT_REGEX = "/([A-Z]+-\\d+)/g";
export const DEFAULT_INPUT_TEXT = "Since [AC-1940], the year Chuck Norris was born, roundhouse kick related deaths have increased 13,000 percent.";

// Regex flag options
export const REGEX_FLAG_OPTIONS = [
  { value: "g", label: "Global (g)", description: "Find all matches" },
  { value: "i", label: "Case Insensitive (i)", description: "Ignore case" },
  { value: "m", label: "Multiline (m)", description: "^ and $ match line boundaries" },
  { value: "s", label: "Dotall (s)", description: ". matches newlines" },
  { value: "u", label: "Unicode (u)", description: "Enable Unicode support" },
];

interface ParseRegexArgs {
  pattern: string;
  flags: string[];
}

/**
 * Parses a regex string that can be in /pattern/flags format or just a plain pattern
 */
export const parseRegex = ({ pattern, flags }: ParseRegexArgs): RegExp | null => {
  if (isBlank(pattern)) return null;

  try {
    // Check if pattern is in /pattern/flags format
    const regexLiteralMatch = pattern.match(/^\/(.+)\/([gimsuy]*)$/);

    if (regexLiteralMatch) {
      const [, regexPattern, regexFlags] = regexLiteralMatch;
      // Merge flags from literal with selected flags, avoiding duplicates
      const mergedFlags = [...new Set([...regexFlags, ...flags])].join("");
      return new RegExp(regexPattern, mergedFlags);
    }

    // Plain pattern, use selected flags
    const flagsString = flags.join("");
    return new RegExp(pattern, flagsString);
  } catch {
    return null;
  }
};

interface TransformArgs {
  pattern: string;
  inputText: string;
  flags: string[];
}

/**
 * Transforms the input text by highlighting regex matches with HTML span tags
 */
export const transformWithHighlights = ({ pattern, inputText, flags }: TransformArgs): string => {
  if (isBlank(pattern) || isBlank(inputText)) {
    return escapeHtml(inputText ?? "").replace(/\n/g, "<br />");
  }

  const regex = parseRegex({ pattern, flags });
  if (isNullish(regex)) {
    return escapeHtml(inputText).replace(/\n/g, "<br />");
  }

  try {
    const escapedText = escapeHtml(inputText);
    const textWithBreaks = escapedText.replace(/\n/g, "{{NEWLINE}}");

    const highlighted = regex.global
      ? textWithBreaks.replaceAll(regex, (match) => `<span class="regex-match">${match}</span>`)
      : textWithBreaks.replace(regex, (match) => `<span class="regex-match">${match}</span>`);

    return highlighted.replace(/\{\{NEWLINE\}\}/g, "<br />");
  } catch {
    return escapeHtml(inputText).replace(/\n/g, "<br />");
  }
};

/**
 * Extracts all matches from the input text and returns them as a comma-separated string
 */
export const extractMatches = ({ pattern, inputText, flags }: TransformArgs): string[] => {
  if (isBlank(pattern) || isBlank(inputText)) {
    return [];
  }

  // Ensure global flag is included for extraction
  const flagsWithGlobal = flags.includes("g") ? flags : [...flags, "g"];
  const regex = parseRegex({ pattern, flags: flagsWithGlobal });

  if (isNullish(regex)) {
    return [];
  }

  try {
    const matches: string[] = [];
    let result: RegExpExecArray | null;

    while ((result = regex.exec(inputText)) !== null) {
      matches.push(result[0]);
      // Prevent infinite loop for zero-length matches
      if (result[0].length === 0) {
        regex.lastIndex++;
      }
    }

    return matches;
  } catch {
    return [];
  }
};

interface TestRegexArgs {
  pattern: string;
  inputText: string;
  flags: string[];
}

/**
 * Main function to test a regex pattern against input text
 */
export const testRegex = ({ pattern, inputText, flags }: TestRegexArgs): RegexTestResult => {
  if (isBlank(pattern)) {
    return {
      highlightedHtml: escapeHtml(inputText ?? "").replace(/\n/g, "<br />"),
      extractedValues: "",
      matchCount: 0,
      uniqueCount: 0,
      error: null,
    };
  }

  try {
    const regex = parseRegex({ pattern, flags });

    if (isNullish(regex)) {
      return {
        highlightedHtml: escapeHtml(inputText ?? "").replace(/\n/g, "<br />"),
        extractedValues: "",
        matchCount: 0,
        uniqueCount: 0,
        error: "Invalid regular expression",
      };
    }

    const highlightedHtml = transformWithHighlights({ pattern, inputText, flags });
    const matches = extractMatches({ pattern, inputText, flags });
    const uniqueMatches = [...new Set(matches)];

    return {
      highlightedHtml,
      extractedValues: matches.join(", "),
      matchCount: matches.length,
      uniqueCount: uniqueMatches.length,
      error: null,
    };
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
    return {
      highlightedHtml: escapeHtml(inputText ?? "").replace(/\n/g, "<br />"),
      extractedValues: "",
      matchCount: 0,
      uniqueCount: 0,
      error: errorMessage,
    };
  }
};

/**
 * Escapes HTML special characters to prevent XSS
 */
const escapeHtml = (text: string): string => {
  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] ?? char);
};

/**
 * Formats the extracted values for display or copy, optionally wrapping them in a format
 */
interface FormatExtractedValuesArgs {
  matches: string[];
  format: "comma" | "jira" | "newline" | "json";
}

export const formatExtractedValues = ({ matches, format }: FormatExtractedValuesArgs): string => {
  if (matches.length === 0) return "";

  switch (format) {
    case "comma":
      return matches.join(", ");
    case "jira":
      return `issueKey in (${matches.join(", ")})`;
    case "newline":
      return matches.join("\n");
    case "json":
      return JSON.stringify(matches, null, 2);
    default:
      return matches.join(", ");
  }
};

export const EXTRACT_FORMAT_OPTIONS = [
  { value: "comma", label: "Comma separated" },
  { value: "jira", label: "Jira filter (issueKey in)" },
  { value: "newline", label: "New lines" },
  { value: "json", label: "JSON array" },
];

export type ExtractFormat = "comma" | "jira" | "newline" | "json";

