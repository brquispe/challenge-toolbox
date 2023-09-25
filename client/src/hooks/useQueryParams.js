import { useState } from "react";

export const useQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const [queryParams, setQueryParams] = useState(Object.fromEntries(params.entries()));

  function setQueryParam(key, value) {
    setQueryParams((previousParams) => {
      const newParams = { ...previousParams };
      if (value === undefined || value === null) {
        delete newParams[key];
      } else {
        newParams[key] = value;
      }
    });

    const updatedParams = new URLSearchParams(queryParams);
    updatedParams.set(key, value);
    const newURL = `${
      window.location.pathname
    }?${updatedParams.toString()}`;
    window.history.replaceState({}, "", newURL);
  }

  return {
    queryParams,
    setQueryParam,
  };
};
