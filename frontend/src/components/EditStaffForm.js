import React, { useState, useEffect } from "react";
import api from "../api/client";

export default function EditStaffForm({ staff, onDone }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(staff);
  }, [staff]);

  const update = (k, v) => setForm({ ...form, [k]: v });

  const save = async (e) => {
    e.preventDefault();
    await api.put("/" + form._id, { ...form, salary: Number(form.salary || 0) });
    onDone();
  };

  return (
    <div className="card">
      <h3>Edit Employee</h3>
      <form onSubmit={save} className="form-col">
        <input value={form.empName} onChange={(e) => update("empName", e.target.value)} />
        <input value={form.staffId} onChange={(e) => update("staffId", e.target.value)} />
        <input value={form.department} onChange={(e) => update("department", e.target.value)} />
        <input value={form.role} onChange={(e) => update("role", e.target.value)} />
        <input value={form.salary} onChange={(e) => update("salary", e.target.value)} />
        <input value={form.email} onChange={(e) => update("email", e.target.value)} />
        <input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
