import { useState } from "react";

/**
 * useAsync is a react hook that adds loading state to an async function
 *
 * @param f function to be executed and return a promise
 * @param delay (optional) delay to set loading state to false
 * @returns
 */
const useAsync = <Args extends any[], T>(
  f: (...args: Args) => Promise<T>,
  delay = 0
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const asyncFn = async (...args: Args) => {
    setLoading(true);

    return f(...args)
      .catch((e) => {
        setError(e);
        throw new Error(e);
      })
      .finally(() => setTimeout(() => setLoading(false), delay));
  };

  return { asyncFn, loading, error };
};

export default useAsync;
