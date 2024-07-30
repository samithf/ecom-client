import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../redux/state/employeeState";
import { Modal } from "../common/modal";

export function EmployeeListActionsCell(col) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const onDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  const onEditEmployee = (id) => {
    navigate(`/employees/edit-employee/${id}`);
  };

  return (
    <>
      <Stack direction="row" gap={2} justifyContent="center" marginTop={1}>
        <Button variant="outlined" color="primary" size="small" onClick={() => onEditEmployee(col.data.id)}>
          Edit
        </Button>
        <Button variant="outlined" color="primary" size="small" onClick={() => setConfirmDelete(true)}>
          Delete
        </Button>
      </Stack>
      <Modal open={confirmDelete} handleClose={() => {}}>
        <p>Are you sure you want to delete this employee?</p>
        <Stack direction="row" gap={2} justifyContent="end" marginTop={3}>
          <Button variant="outlined" color="primary" onClick={() => setConfirmDelete(false)}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={() => onDeleteEmployee(col.data.id)}>
            Yes
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
