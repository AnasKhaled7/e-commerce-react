import { Button, styled } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

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

const ImageUploadField = ({ id, handleFileUpload }) => {
  return (
    <Button
      component="label"
      size="large"
      variant="outlined"
      startIcon={<CloudUpload />}
    >
      Upload Image
      <VisuallyHiddenInput
        id={id}
        type="file"
        name="image"
        onChange={handleFileUpload}
      />
    </Button>
  );
};

export default ImageUploadField;
