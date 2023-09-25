import { createContext, useContext } from "react";
import { useQueryParams } from "../hooks/useQueryParams";

const QueryParamsContext = createContext(null);

const QueryParamsProvider = ({ children }) => {
  const { queryParams, setQueryParam } = useQueryParams();

  return (
    <QueryParamsContext.Provider value={{ queryParams, setQueryParam }}>
      {children}
    </QueryParamsContext.Provider>
  );
};

export const useQueryParamsContext = () => {
  const queryParamsCtx = useContext(QueryParamsContext);
  if (!queryParamsCtx) {
    throw new Error("You must use Query Params Context within its provider");
  }
  return queryParamsCtx;
};

export default QueryParamsProvider;
