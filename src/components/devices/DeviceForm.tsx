import { useState, useEffect, ChangeEvent } from "react";
import {
  TextField,
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { Device } from "../../types";
import { convertToBase64 } from "../../utils";

export default function DeviceForm({ device }: { device?: Device }) {
  const [base64Image, setBase64Image] = useState(device?.image || "");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (device?.image) {
      setBase64Image(device.image);
      setFileName("Current Image");
    }
  }, [device]);

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
    <Box>
      <TextField
        autoFocus
        required
        margin="dense"
        name="name"
        label="Device Name"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={device?.name ?? ""}
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
      <TextField
        required
        margin="dense"
        name="ramSizeGB"
        label="RAM Size (GB)"
        type="number"
        fullWidth
        variant="standard"
        slotProps={{ htmlInput: { type: "number", step: 0.1, min: 0.5 } }}
        defaultValue={device?.ramSizeGB ?? ""}
      />

      <TextField
        required
        margin="dense"
        name="storageSizeGB"
        label="Storage Size (GB)"
        type="number"
        fullWidth
        variant="standard"
        slotProps={{ htmlInput: { type: "number", min: 1 } }}
        defaultValue={device?.storageSizeGB ?? ""}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={"Manufacture Date"}
          views={["month", "year"]}
          name="manufactureDate"
          format="YYYY MMMM"
          slotProps={{
            textField: {
              required: true,
              variant: "standard",
              margin: "dense",
              fullWidth: true,
              defaultValue: device?.manufactureDate ?? null,
            },
          }}
          disableFuture
          // @ts-ignore
          defaultValue={
            device ? dayjs(device.manufactureDate, "YYYY MMMM") : null
          }
        />
      </LocalizationProvider>

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
    </Box>
  );
}
