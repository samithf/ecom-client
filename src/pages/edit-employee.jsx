import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AddEditEmployeeForm } from "../components/employees/add-edit-employee-form";
import { getEmployee } from "../redux/state/employeeState";

export default function EditEmployeePage() {
  const { employeeId } = useParams();
  const dispatch = useDispatch();

  const { selectedEmployee, isLoading } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployee(employeeId));
  }, [dispatch, employeeId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!selectedEmployee) {
    return;
  }

  const employee = selectedEmployee.data;

  const initialEditState = {
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    startDate: employee.startDate.split("T")[0],
    cafe: employee.cafe,
    id: employee.id,
    gender: employee.gender,
    cafeId: employee.cafe ? employee.cafe.id : null,
  };

  return <AddEditEmployeeForm initialEditState={initialEditState} />;
}
