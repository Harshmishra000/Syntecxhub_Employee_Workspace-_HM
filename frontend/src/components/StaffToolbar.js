import React, { useState } from "react";

export default function StaffToolbar({ onSearch }) {
  const [q, setQ] = useState("");

  return (
    <div className="toolbar">
      <input
        placeholder="Search by name, id..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button onClick={() => onSearch(q)}>Search</button>
      <button onClick={() => { setQ(""); onSearch(""); }}>Reset</button>
    </div>
  );
}
