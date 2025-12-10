const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  empName: { type: String, required: true, trim: true },       
  staffId: { type: String, required: true, unique: true },      
  department: { type: String, default: "General" },
  role: { type: String, default: "Employee" },
  salary: { type: Number, default: 0 },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  status: { type: String, default: "active" },                  
  notes: { type: String, default: "" },
  joinedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StaffMember", StaffSchema);
