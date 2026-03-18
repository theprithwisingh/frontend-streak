import React from "react";
import { useState, useCallback, useId, memo } from "react";
import useDebounce from "../hooks/useDebounce";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 500);
  const inputId = useId();

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleEffect = useCallback(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  // trigger when debounced changes
  React.useEffect(() => {
    handleEffect();
  }, [handleEffect]);

  return (
    <div>
      <label htmlFor={inputId}>Search</label>
      <input
        id={inputId}
        value={value}
        onChange={handleChange}
        placeholder="Type to search..."
      />
    </div>
  );
}

export default memo(SearchBar);
