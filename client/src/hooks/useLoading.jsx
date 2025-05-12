import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loading = () => {
    setIsLoading(true);
  };

  const loaded = () => {
    setIsLoading(false);
  };

  return { isLoading, loading, loaded };
};
