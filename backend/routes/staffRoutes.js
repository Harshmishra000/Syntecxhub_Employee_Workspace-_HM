const express = require("express");
const router = express.Router();
const StaffMember = require("../models/StaffMember");
const { createObjectCsvStringifier } = require("csv-writer");

router.get("/", async (req, res) => {
  try {
    const { q, dept } = req.query;
    const filters = {};

    if (q) {
      const regex = new RegExp(q, "i");
      filters.$or = [{ empName: regex }, { staffId: regex }, { email: regex }];
    }
    if (dept) filters.department = dept;

    const result = await StaffMember.find(filters).sort({ joinedOn: -1 });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error loading staff list" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await StaffMember.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not Found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (!data.empName || !data.staffId)
      return res.status(400).json({ message: "Name & Staff ID required" });

    const newStaff = new StaffMember(data);
    const saved = await newStaff.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: "Staff ID already exists" });

    res.status(500).json({ message: "Creation failed" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await StaffMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await StaffMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed" });
  }
});

router.get("/export/csv", async (req, res) => {
  try {
    const rows = await StaffMember.find({}).lean();
    const csv = createObjectCsvStringifier({
      header: [
        { id: "staffId", title: "StaffID" },
        { id: "empName", title: "Name" },
        { id: "department", title: "Department" },
        { id: "role", title: "Role" },
        { id: "salary", title: "Salary" }
      ]
    });

    const output = csv.getHeaderString() + csv.stringifyRecords(rows);
    res.setHeader("Content-Type", "text/csv");
    res.send(output);

  } catch {
    res.status(500).json({ message: "CSV Export Failed" });
  }
});

module.exports = router;
