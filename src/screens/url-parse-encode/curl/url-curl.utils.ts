import * as cURLConverter from "curlconverter";

type CurlConverterFnc = (data: string) => string;

interface CurlConverterType {
  transform: CurlConverterFnc;
  syntaxLanguage: string;
}

export const CONVERTERS: Map<string, CurlConverterType> = new Map([
  ["Ansible", { syntaxLanguage: "yaml", transform: cURLConverter.toAnsible }],
  ["Browser", { syntaxLanguage: "javascript", transform: cURLConverter.toBrowser }],
  ["CFML", { syntaxLanguage: "xml", transform: cURLConverter.toCFML }],
  ["CSharp", { syntaxLanguage: "csharp", transform: cURLConverter.toCSharp }],
  ["Dart", { syntaxLanguage: "dart", transform: cURLConverter.toDart }],
  ["Elixir", { syntaxLanguage: "elixir", transform: cURLConverter.toElixir }],
  ["Go", { syntaxLanguage: "go", transform: cURLConverter.toGo }],
  ["Java", { syntaxLanguage: "java", transform: cURLConverter.toJava }],
  ["Javascript", { syntaxLanguage: "javascript", transform: cURLConverter.toJavaScript }],
  ["JSON String", { syntaxLanguage: "json", transform: cURLConverter.toJsonString }],
  ["MATLAB", { syntaxLanguage: "matlab", transform: cURLConverter.toMATLAB }],
  ["Node", { syntaxLanguage: "javascript", transform: cURLConverter.toNode }],
  ["Node Axios", { syntaxLanguage: "javascript", transform: cURLConverter.toNodeAxios }],
  ["Node Fetch", { syntaxLanguage: "javascript", transform: cURLConverter.toNodeFetch }],
  ["Node Request", { syntaxLanguage: "javascript", transform: cURLConverter.toNodeRequest }],
  ["PHP", { syntaxLanguage: "php", transform: cURLConverter.toPhp }],
  ["PHP Requests", { syntaxLanguage: "php", transform: cURLConverter.toPhpRequests }],
  ["Python", { syntaxLanguage: "python", transform: cURLConverter.toPython }],
  ["R", { syntaxLanguage: "r", transform: cURLConverter.toR }],
  ["Ruby", { syntaxLanguage: "ruby", transform: cURLConverter.toRuby }],
  ["Rust", { syntaxLanguage: "rust", transform: cURLConverter.toRust }],
  ["Swift", { syntaxLanguage: "swift", transform: cURLConverter.toSwift }],
  ["Wget", { syntaxLanguage: "bash", transform: cURLConverter.toWget }],
]);

export const CONVERTERS_LIST = [...CONVERTERS.keys()];

export const transformCurl = (value?: string, targetLanguage = "Javascript"): string => {
  if (!value) {
    return "";
  }

  try {
    const curlCommand = value.replaceAll(/(\r\n|\n|\r)/gm, " ");
    const converter = CONVERTERS.get(targetLanguage);
    return converter ? converter.transform(curlCommand) : `Warning: no converter found matching "${targetLanguage}"`;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `Error converting cURL command: ${message}`;
  }
};

export const getSyntaxLanguage = (targetLanguage: string): string => {
  return CONVERTERS.get(targetLanguage)?.syntaxLanguage ?? "text";
};

export const isBlank = (value?: string): boolean => {
  return !value || value.trim().length === 0;
};

