import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../constants/urls";
import { createCafe, updateCafe } from "../../redux/state/cafeState";
import { ImageUpload } from "../common/image-upload";
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

export function AddEditCafeForm({ initialEditState }) {
  const { mutating } = useSelector((state) => state.cafe);
  const [fieldErrors, setFieldErrors] = useState({ name: "", description: "", location: "" });
  const navigate = useNavigate();
  const [cafeFormData, setCafeFormData] = useState({ name: "", description: "", location: "", logo: null });

  const dispatch = useDispatch();

  useEffect(() => {
    if (initialEditState) {
      if (!initialEditState.logo) {
        return setCafeFormData({
          name: initialEditState.name,
          description: initialEditState.description,
          location: initialEditState.location,
          logo: null,
        });
      }
      imageUrlToFile(`${SERVER_URL}/${initialEditState.logo}`, "dummy.jpg").then((file) => {
        setCafeFormData({
          name: initialEditState.name,
          description: initialEditState.description,
          location: initialEditState.location,
          logo: file,
        });
      });
    }
  }, [initialEditState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCafeFormData({
      ...cafeFormData,
      [name]: value,
    });
  };

  const handleLogoChange = (logo) => {
    setCafeFormData({
      ...cafeFormData,
      logo,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const errors = validateCafeForm(cafeFormData);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    const formData = new FormData();
    formData.append("name", cafeFormData.name);
    formData.append("description", cafeFormData.description);
    formData.append("location", cafeFormData.location);
    formData.append("logo", cafeFormData.logo);

    if (initialEditState) {
      dispatch(updateCafe({ id: initialEditState.id, formData }));
      navigate("/");

      return;
    }

    dispatch(createCafe(formData));

    navigate("/");
  };

  // since this is a simple form. didnt use react-hook-form with yup or zod for validation
  const validateCafeForm = (cafeFormData) => {
    const errors = {};

    const name = cafeFormData.name.trim();
    const description = cafeFormData.description.trim();
    const location = cafeFormData.location.trim();

    if (name.length < 6 || name.length > 10) {
      errors.name = "Name should be between 6 and 10 characters";
    }
    if (description.length === 0 || description.length > 255) {
      errors.description = "Description is required and should be less than 255 characters";
    }
    if (location.length === 0) {
      errors.location = "Location is required";
    }

    return errors;
  };

  return (
    <form onSubmit={onSubmitForm}>
      <SyledForm>
        {initialEditState ? <h2>Edit Cafe</h2> : <h2>Add Cafe</h2>}
        <ImageUpload onChangeImage={handleLogoChange} logo={cafeFormData?.logo} />
        <Textbox
          id="name"
          name="name"
          label="Name"
          value={cafeFormData.name}
          onChange={handleChange}
          hasError={!!fieldErrors.name}
          helperText={fieldErrors.name}
        />
        <Textbox
          id="description"
          name="description"
          label="Description"
          value={cafeFormData.description}
          onChange={handleChange}
          hasError={!!fieldErrors.description}
          helperText={fieldErrors.description}
        />
        <Textbox
          id="location"
          name="location"
          label="Location"
          value={cafeFormData.location}
          onChange={handleChange}
          hasError={!!fieldErrors.location}
          helperText={fieldErrors.location}
        />
        <Stack direction="row" gap={2} marginLeft="auto" marginBlock={2}>
          <Button color="primary" onClick={() => navigate("/")}>
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

const imageUrlToFile = async (imageUrl, fileName) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
};
