import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCafe } from "../../redux/state/cafeState";
import { Modal } from "../common/modal";

export function CafeListActionsCell(col) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const onDeleteCafe = (id) => {
    dispatch(deleteCafe(id));
  };

  const onEditCafe = (id) => {
    navigate(`/cafes/edit-cafe/${id}`);
  };

  return (
    <>
      <Stack direction="row" gap={2} justifyContent="center" marginTop={1}>
        <Button variant="outlined" color="primary" size="small" onClick={() => onEditCafe(col.data.id)}>
          Edit
        </Button>
        <Button variant="outlined" color="primary" size="small" onClick={() => setConfirmDelete(true)}>
          Delete
        </Button>
      </Stack>
      <Modal open={confirmDelete} handleClose={() => {}}>
        <p>Are you sure you want to delete this cafe?</p>
        <Stack direction="row" gap={2} justifyContent="end" marginTop={3}>
          <Button variant="outlined" color="primary" onClick={() => setConfirmDelete(false)}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={() => onDeleteCafe(col.data.id)}>
            Yes
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
