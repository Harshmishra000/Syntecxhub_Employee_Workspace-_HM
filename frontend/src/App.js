import React, { useEffect, useState } from "react";
import StaffToolbar from "./components/StaffToolbar";
import StaffList from "./components/StaffList";
import AddStaffForm from "./components/AddStaffForm";
import EditStaffForm from "./components/EditStaffForm";
import api from "./api/client";
import "./styles/main.css";

export default function App() {
  const [staff, setStaff] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const load = async (q = "") => {
    const res = await api.get("/", { params: { q } });
    setStaff(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="app-wrap">
      <h1>Employee Workspace — HM Dev</h1>

      <StaffToolbar onSearch={load} />

      <div className="grid">
        <div>
          <AddStaffForm onAdded={load} />
          <br></br>
          {editItem && <EditStaffForm staff={editItem} onDone={() => { setEditItem(null); load(); }} />}
        </div>

        <StaffList staff={staff} onEdit={(x) => setEditItem(x)} onReload={load} />
      </div>
    </div>
  );
}
