import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UrlCurlState {
  inputCurl: string;
  targetLanguage: string;
  transformedResult: string;
  setInputCurl: (curl: string) => void;
  setTargetLanguage: (language: string) => void;
  setTransformedResult: (result: string) => void;
}

const DEFAULT_CURL = `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token123" \\
  -d '{"name": "John", "email": "john@example.com"}'`;

export const useUrlCurlStore = create<UrlCurlState>()(
  persist(
    (set) => ({
      inputCurl: DEFAULT_CURL,
      targetLanguage: "Javascript",
      transformedResult: "",
      setInputCurl: (curl) => set({ inputCurl: curl }),
      setTargetLanguage: (language) => set({ targetLanguage: language }),
      setTransformedResult: (result) => set({ transformedResult: result }),
    }),
    {
      name: "etoolbox-url-curl",
    },
  ),
);

