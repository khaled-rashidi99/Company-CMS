import TextField from "@mui/material/TextField";
import { Accessory } from "../../types";
import { useState, useEffect, ChangeEvent } from "react";
import { Box, Typography, Card, CardMedia, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { convertToBase64 } from "../../utils";

export default function AccessoryForm({
  accessory,
}: {
  accessory?: Accessory;
}) {
  const [base64Image, setBase64Image] = useState(accessory?.image || "");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (accessory?.image) {
      setBase64Image(accessory.image);
      setFileName("Current Image");
    }
  }, [accessory]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      try {
        convertToBase64(file).then((base64) => setBase64Image(base64));
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const handleRemoveImage = () => {
    setBase64Image("");
    setFileName("");
  };

  return (
    <>
      <TextField
        autoFocus
        required
        margin="dense"
        name="name"
        label="Accessory Name"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={accessory?.name ?? ""}
      />
      <TextField
        required
        margin="dense"
        name="image"
        label="Image Base64"
        type="text"
        fullWidth
        variant="standard"
        value={base64Image}
        InputProps={{
          readOnly: true,
        }}
        className="!hidden"
      />
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="subtitle1" className="!mb-1">
          Device Image
        </Typography>
        {base64Image ? (
          <Card sx={{ mb: 2 }}>
            <CardMedia
              component="img"
              image={base64Image}
              alt="Device Image"
              sx={{ height: 200, objectFit: "contain" }}
            />
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">{fileName}</Typography>
              <IconButton
                onClick={handleRemoveImage}
                color="error"
                aria-label="remove image"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Card>
        ) : (
          <TextField
            type="file"
            onChange={handleFileChange}
            fullWidth
            required
            variant="standard"
            margin="dense"
            slotProps={{
              htmlInput: { accept: "image/*", sx: { pb: 2 } },
            }}
          />
        )}
      </Box>
    </>
  );
}
