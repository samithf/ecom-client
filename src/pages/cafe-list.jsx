import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CafeListActionsCell } from "../components/cafes/cafe-list-actions-cell";
import { CafeLogoCell } from "../components/cafes/cafe-logo-cell";
import { EmployeeCountCell } from "../components/cafes/employee-count-cell";
import { LocationFilter } from "../components/cafes/location-filter";
import { DataTable } from "../components/common/data-table";
import { getCafes } from "../redux/state/cafeState";

const colDef = [
  {
    headerName: "Logo",
    flex: 1,
    sortable: false,
    cellRenderer: CafeLogoCell,
  },
  { headerName: "Name", field: "name", flex: 1, sortable: false },
  { headerName: "Description", field: "description", flex: 2, sortable: false },
  { headerName: "Employees", flex: 1, sortable: false, cellRenderer: EmployeeCountCell },
  { headerName: "Location", field: "location", flex: 1, sortable: false },
  {
    headerName: "",
    flex: 1,
    sortable: false,
    cellRenderer: CafeListActionsCell,
  },
];

export default function CafeListPage() {
  const { cafes, isLoading } = useSelector((state) => state.cafe);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCafes());
  }, [dispatch]);

  if (!cafes) {
    return;
  }

  const gridRowData = cafes.map((cafe) => ({
    id: cafe.id,
    name: cafe.name,
    logo: cafe.logo,
    location: cafe.location,
    employees: cafe.employees,
    description: cafe.description,
  }));

  const onChangeLocation = (location) => {
    if (location === "all") {
      location = "";
    }

    dispatch(getCafes(location));
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        <h1>Cafes</h1>
        <LocationFilter cafes={cafes} onChangeLocation={onChangeLocation} />
        <Button
          variant="contained"
          style={{ marginLeft: "auto" }}
          onClick={() => navigate("/cafes/add-cafe")}
          startIcon={<AddIcon />}
        >
          Add Cafe
        </Button>
      </Stack>
      <div className="ag-theme-quartz" style={{ height: "70vh" }}>
        <DataTable rowData={gridRowData} columnDefs={colDef} rowHeight={50} suppressCellFocus loading={isLoading} />
      </div>
    </>
  );
}
