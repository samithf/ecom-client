import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataTable } from "../components/common/data-table";
import { CafeNameCell } from "../components/employees/cafe-name-cell";
import { EmployeeListActionsCell } from "../components/employees/employee-list-actions-cell";
import { getEmployees } from "../redux/state/employeeState";

const colDef = [
  { headerName: "Employee ID", field: "employeeId", flex: 1, sortable: false },
  { headerName: "Name", field: "name", flex: 1, sortable: false },
  { headerName: "Email", field: "email", flex: 2, sortable: false },
  { headerName: "Phone Number", field: "phone", flex: 1, sortable: false },
  { headerName: "Days worked", field: "daysWorked", flex: 1, sortable: false },
  { headerName: "Cafe Name", cellRenderer: CafeNameCell, flex: 1, sortable: false },
  {
    headerName: "",
    flex: 1,
    sortable: false,
    cellRenderer: EmployeeListActionsCell,
  },
];

export default function EmployeeListPage() {
  const params = useParams();
  const cafeId = params.cafeId;

  const location = useLocation();
  const { cafeName } = location.state || {};

  const { employees, isLoading } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cafeId) {
      dispatch(getEmployees(cafeId));
      return;
    }
    dispatch(getEmployees());
  }, [cafeId, dispatch]);

  if (!employees) {
    return;
  }

  const gridRowData = employees.map((employee) => ({
    employeeId: employee.employeeId,
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    daysWorked: employee.daysWorked,
    cafe: employee.cafe,
    id: employee.id,
  }));

  return (
    <>
      <Stack direction="row" alignItems="center">
        <h1>Employee List {cafeId ? `working at ${cafeName}` : ""}</h1>
        <Button
          variant="contained"
          style={{ marginLeft: "auto" }}
          onClick={() => navigate("/employees/add-employee")}
          startIcon={<AddIcon />}
        >
          Add Employee
        </Button>
      </Stack>
      <div className="ag-theme-quartz" style={{ height: "70vh" }}>
        <DataTable rowData={gridRowData} columnDefs={colDef} rowHeight={50} suppressCellFocus loading={isLoading} />
      </div>
    </>
  );
}
