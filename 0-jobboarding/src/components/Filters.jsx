import React from "react";

const Filters = React.memo(({ types, selected, onSelect }) => {
  console.log("Filters render");

  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {types.map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          style={{
            backgroundColor: selected === t ? "black" : "red",
            color: "white",
            padding: "6px 12px",
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
});

export default Filters;