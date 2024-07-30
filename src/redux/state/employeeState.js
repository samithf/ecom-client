import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    isLoading: false,
    error: null,
    selectedEmployee: null,
    mutating: false,
  },
  reducers: {
    getEmployees: (state, action) => {
      state.isLoading = true;
    },
    getEmployeesSuccess: (state, action) => {
      state.employees = action.payload;
      state.isLoading = false;
    },
    getEmployeesFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    createEmployee: (state, action) => {
      state.mutating = true;
    },
    createEmployeeSuccess: (state, action) => {
      state.employees.push(action.payload);
      state.mutating = false;
    },
    createEmployeeFailure: (state, action) => {
      state.error = action.payload;
      state.mutating = false;
    },
    updateEmployee: (state, action) => {
      state.mutating = true;
    },
    updateEmployeeSuccess: (state, action) => {
      state.employees = state.employees.map((employee) => {
        if (employee.id === action.payload.id) {
          return action.payload;
        }
        return employee;
      });
      state.mutating = false;
    },
    updateEmployeeFailure: (state, action) => {
      state.error = action.payload;
      state.mutating = false;
    },
    deleteEmployee: (state, action) => {
      state.mutating = true;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.employees = state.employees.filter((employee) => employee.id !== action.payload);
      state.mutating = false;
    },
    deleteEmployeeFailure: (state, action) => {
      state.error = action.payload;
      state.mutating = false;
    },
    getEmployee: (state, action) => {
      state.isLoading = true;
    },
    getEmployeeSuccess: (state, action) => {
      state.selectedEmployee = action.payload;
      state.isLoading = false;
    },
    getEmployeeFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  getEmployees,
  getEmployeesSuccess,
  getEmployeesFailure,
  createEmployee,
  createEmployeeSuccess,
  createEmployeeFailure,
  updateEmployee,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  deleteEmployee,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  getEmployee,
  getEmployeeSuccess,
  getEmployeeFailure,
} = employeeSlice.actions;

export default employeeSlice.reducer;
