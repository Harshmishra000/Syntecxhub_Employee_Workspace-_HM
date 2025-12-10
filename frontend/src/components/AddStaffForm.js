import React, { useState } from "react";
import api from "../api/client";

export default function AddStaffForm({ onAdded }) {
  const [form, setForm] = useState({
    empName: "",
    staffId: "",
    department: "",
    role: "",
    salary: "",
    email: "",
    phone: "",
    notes: ""
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/", { ...form, salary: Number(form.salary || 0) });
    onAdded();
    setForm({
      empName: "",
      staffId: "",
      department: "",
      role: "",
      salary: "",
      email: "",
      phone: "",
      notes: ""
    });
  };

  return (
    <div className="card">
      <h3>Add Employee</h3>
      <form onSubmit={submit} className="form-col">
        <input placeholder="Employee Name" value={form.empName} onChange={(e) => update("empName", e.target.value)} />
        <input placeholder="Staff ID" value={form.staffId} onChange={(e) => update("staffId", e.target.value)} />
        <input placeholder="Department" value={form.department} onChange={(e) => update("department", e.target.value)} />
        <input placeholder="Role" value={form.role} onChange={(e) => update("role", e.target.value)} />
        <input placeholder="Salary" value={form.salary} onChange={(e) => update("salary", e.target.value)} />
        <input placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        <input placeholder="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        <textarea placeholder="Notes" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
