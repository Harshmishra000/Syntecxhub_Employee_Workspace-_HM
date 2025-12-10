import axios from "axios";

// custom API wrapper by Harsh
const base = process.env.REACT_APP_API_BASE || "http://localhost:5600/api";

export default axios.create({
  baseURL: base + "/officeStaff",
  timeout: 8000
});
