// hooks/usePagination.js
import { useMemo } from "react";

export const usePagination = ({ data = [], page, limit }) => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    const end = page * limit;
    return data.slice(start, end);
  }, [data, page, limit]);

  return {
    paginatedData,
    totalPages,
    totalItems,
  };
};
