import React from "react";
import api from "../api/client";

export default function StaffList({ staff, onEdit, onReload }) {
  const remove = async (id) => {
    await api.delete("/" + id);
    onReload();
  };

  return (
    <div className="card">
      <h3>Employees</h3>
      {staff.length === 0 && <p>No data</p>}

      <ul className="staff-list">
        {staff.map((s) => (
          <li key={s._id} className="staff-item">
            <div>
              <strong>{s.empName}</strong> <span>({s.staffId})</span>
              <div>{s.role} — {s.department}</div>
              <div>{s.email} {s.phone && " • " + s.phone}</div>
            </div>

            <div>
              <button onClick={() => onEdit(s)}>Edit</button>
              <button onClick={() => remove(s._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
