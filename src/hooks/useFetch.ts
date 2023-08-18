import { useCallback, useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_API_KEY ?? "";

const authorization = {
  Authorization: `apiKey ${apiKey}`,
};

interface UseFetch {
  doFetch: (url1?: string) => void;
  results: any[];
  isLoading: boolean;
  error: string;
  setResults: (state: any[]) => void;
  setError: (state: string) => void;
}

/**
 * I could have used an exisiting library for fetching such as useSWR or useFetch
 * but because of the many cases performing requests in this app I decided to go over with
 * this own implementation
 */

const ERROR_MESSAGE =
  "There was an error while processing this request, please try again";

export const useFetch = (autoMountUrL?: string): UseFetch => {
  const [results, setResults] = useState([]) as any[];
  const [isLoading, setIsloading] = useState(false);
const [error, setError] = useState("");

  const doFetch = useCallback(
    async (separatedUrl?: string, headers: object = authorization) => {
      if (isLoading) return;

      setIsloading(true);
      try {
        const definedUrL = autoMountUrL ?? separatedUrl;
        if (!definedUrL) return;

        const response = await fetch(definedUrL, {
          headers: {
            ...authorization,
            ...headers,
          },
        });

        if (!response.ok) {
          setError(ERROR_MESSAGE);
          return;
        }

        const result = await response.json();

        if (result.errors?.length) {
          setError(ERROR_MESSAGE);
          return;
        }

        setResults(result?.data);
        setError("");

        return result;
      } catch (error) {
        setError(ERROR_MESSAGE);
      } finally {
        setIsloading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!autoMountUrL) return;
    doFetch(autoMountUrL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { doFetch, results, isLoading, error, setResults, setError };
};
