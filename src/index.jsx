import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/common/layout";
import store from "./redux/configureStore";

import AddCafePage from "./pages/add-cafe";
import AddEmployeePage from "./pages/add-employee";
import CafeListPage from "./pages/cafe-list";
import EditCafePage from "./pages/edit-cafe";
import EditEmployeePage from "./pages/edit-employee";
import EmployeeListPage from "./pages/employee-list";

import "./index.css";
import { history } from "./history";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <CafeListPage /> },
      {
        path: "cafes",
        children: [
          { path: "", element: <CafeListPage /> },
          { path: "add-cafe", element: <AddCafePage /> },
          { path: "edit-cafe/:cafeId", element: <EditCafePage /> },
        ],
      },
      {
        path: "employees",
        children: [
          { path: "", element: <EmployeeListPage /> },
          { path: "cafe/:cafeId", element: <EmployeeListPage /> },
          { path: "add-employee", element: <AddEmployeePage /> },
          { path: "edit-employee/:employeeId", element: <EditEmployeePage /> },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} history={history} />
    </Provider>
  </React.StrictMode>
);
