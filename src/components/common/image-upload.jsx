import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function ImageUpload({ onChangeImage, logo = null }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (logo) {
      setSelectedFile(logo);
    }
  }, [logo]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);

    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function onSelectFile(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      onChangeImage(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
    onChangeImage(e.target.files[0]);
  }

  function onDeleteImage() {
    setSelectedFile(null);
    onChangeImage(null);
  }

  return (
    <div>
      <Button component="label" tabIndex={-1} startIcon={<CloudUploadIcon />} onChange={onSelectFile}>
        Upload logo
        <VisuallyHiddenInput type="file" />
      </Button>
      {selectedFile && preview ? (
        <div>
          <img src={preview} alt="Preview" style={{ height: 300, display: "block" }} />
          <CloseIcon style={{ cursor: "pointer" }} onClick={onDeleteImage} />
        </div>
      ) : null}
    </div>
  );
}
