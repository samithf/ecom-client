import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCafes } from "../../redux/state/cafeState";
import { createEmployee, updateEmployee } from "../../redux/state/employeeState";
import { RadioButtons } from "../common/radio-buttons";
import { SelectMenu } from "../common/select-menu";
import { Textbox } from "../common/textbox";

const SyledForm = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(6),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  maxWidth: 600,
  gap: theme.spacing(3),
  marginInline: "auto",
  backgroundColor: theme.palette.background.paper,
  marginTop: theme.spacing(3),
}));

const options = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

export function AddEditEmployeeForm({ initialEditState }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [employeeFormData, setEmployeeFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    gender: "",
    cafeId: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    gender: "",
    cafeId: "",
  });

  const { cafes } = useSelector((state) => state.cafe);
  const { mutating } = useSelector((state) => state.employee);
  const allCafeNames = cafes.map((cafe) => ({ value: cafe.id, label: cafe.name }));

  useEffect(() => {
    if (initialEditState) {
      setEmployeeFormData({
        name: initialEditState.name,
        email: initialEditState.email,
        phone: initialEditState.phone,
        startDate: initialEditState.startDate,
        gender: initialEditState.gender,
        cafeId: initialEditState.cafeId,
      });
    }
  }, [initialEditState]);

  useEffect(() => {
    dispatch(getCafes());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeFormData({
      ...employeeFormData,
      [name]: value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const errors = validateEmployeeForm(employeeFormData);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    if (initialEditState) {
      dispatch(updateEmployee({ id: initialEditState.id, employeeFormData }));
      navigate("/employees");
      return;
    }

    dispatch(createEmployee(employeeFormData));

    navigate("/employees");
  };

  // since this is a simple form. didnt use react-hook-form and yup or zod for validation
  const validateEmployeeForm = (cafeFormData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[89]\d{7}$/;

    const name = employeeFormData.name.trim();
    const email = employeeFormData.email.trim();
    const phone = employeeFormData.phone.trim();
    const startDate = employeeFormData.startDate;
    const gender = employeeFormData.gender;
    const cafeId = employeeFormData.cafeId;

    if (name.length < 6 || name.length > 10) {
      errors.name = "Name should be between 6 and 10 characters";
    }
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email";
    }
    if (!phoneRegex.test(phone)) {
      errors.phone = "Invalid phone number";
    }
    if (!startDate) {
      errors.startDate = "This is required";
    }
    if (!gender) {
      errors.gender = "This is required";
    }
    if (!cafeId) {
      errors.cafeId = "This is required";
    }

    return errors;
  };

  return (
    <form onSubmit={onSubmitForm}>
      <SyledForm>
        {initialEditState ? <h2>Edit Employee</h2> : <h2>Add Employee</h2>}
        <Textbox
          id="name"
          name="name"
          label="Name"
          value={employeeFormData.name}
          onChange={handleChange}
          hasError={!!fieldErrors.name}
          helperText={fieldErrors.name}
        />
        <Textbox
          id="email"
          name="email"
          label="Email"
          value={employeeFormData.email}
          onChange={handleChange}
          hasError={!!fieldErrors.email}
          helperText={fieldErrors.email}
          type="email"
        />
        <Textbox
          id="phone"
          name="phone"
          label="Phone"
          value={employeeFormData.phone}
          onChange={handleChange}
          hasError={!!fieldErrors.phone}
          helperText={fieldErrors.phone}
          type="number"
        />
        <Textbox
          id="startDate"
          name="startDate"
          label="Start Date"
          value={employeeFormData.startDate}
          onChange={handleChange}
          hasError={!!fieldErrors.startDate}
          helperText={fieldErrors.startDate}
          type="date"
        />
        <RadioButtons
          label="Gender"
          name="gender"
          options={options}
          selectedValue={employeeFormData.gender}
          onChange={handleChange}
          direction="row"
          hasError={!!fieldErrors.gender}
          helperText={fieldErrors.gender}
        />
        <SelectMenu
          id="cafes-menu"
          name="cafeId"
          options={allCafeNames}
          label="Cafe"
          selectedValue={employeeFormData.cafeId}
          onChange={handleChange}
          hasError={!!fieldErrors.cafeId}
          helperText={fieldErrors.cafeId}
        />
        <Stack direction="row" gap={2} marginLeft="auto" marginBlock={2}>
          <Button color="primary" onClick={() => navigate("/employees")}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={mutating}>
            {mutating ? <CircularProgress size={18} /> : null}
            Submit
          </Button>
        </Stack>
      </SyledForm>
    </form>
  );
}
