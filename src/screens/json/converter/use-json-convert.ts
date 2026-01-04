import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useEffect } from "react";

import { transform } from "./json-converter.utils";

export const useJsonConvert = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { data, mutate, isPending, isError, error, isSuccess, reset } = useMutation({
    mutationFn: transform,
    onSuccess: () => {
      messageApi.success("Conversion completed!");
    },
  });

  useEffect(() => {
    if (isError && error) {
      messageApi.error(`Conversion failed: ${error.message}`);
    }
  }, [isError, error, messageApi]);

  return {
    result: data ?? "",
    convert: mutate,
    isConverting: isPending,
    isConvertError: isError,
    isConvertSuccess: isSuccess,
    convertError: error,
    resetConvert: reset,
    contextHolder,
  };
};
