import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
  },
  reducers: {},
});

export default employeeSlice.reducer;