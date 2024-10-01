import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
  InputAdornment,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Accessory, Offer } from "../../types";
import { createOffer, editOffer } from "../../services/offers";

export default function OfferForm({
  offer,
  deviceId,
  deviceAccessories,
  onSubmit,
  onCancel,
  readOnly = false,
  mode,
}: {
  offer?: Offer;
  deviceId: number;
  deviceAccessories: Accessory[];
  onSubmit: (offer: Offer) => void;
  onCancel: () => void;
  readOnly?: boolean;
  mode: "create" | "edit";
}) {
  const [price, setPrice] = useState<number | "">(offer?.price ?? "");
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(
    offer ? dayjs(offer.endDate) : null
  );
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>(
    offer?.accessories ?? []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const offer: Offer = {
      deviceId,
      price: price as number,
      endDate: endDate!.toISOString(),
      accessories: selectedAccessories,
    };
    if (mode === "create") createOffer(offer);
    else editOffer(offer);
    onSubmit(offer);
  };

  const handleChange = (
    event: SelectChangeEvent<typeof selectedAccessories>
  ): void => {
    const {
      target: { value },
    } = event;
    setSelectedAccessories(
      typeof value === "string" ? JSON.parse(value) : value
    );
  };

  const resetForm = () => {
    setPrice(offer?.price ?? "");
    setEndDate(offer ? dayjs(offer.endDate) : null);
    setSelectedAccessories(offer?.accessories ?? []);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <div className="flex flex-col w-[30rem] gap-3">
        <TextField
          required={!readOnly}
          margin="dense"
          name="price"
          label="Price"
          type="number"
          variant="standard"
          slotProps={{
            htmlInput: { type: "number", min: 1, readOnly },
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          value={price}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            event.stopPropagation();
            if (event.target.value === "") {
              setPrice("");
              return;
            }
            const value = parseFloat(event.target.value);
            if (typeof value === "number" && !isNaN(value)) setPrice(value);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={"End Date"}
            views={["day", "month", "year"]}
            name="endDate"
            slotProps={{
              textField: {
                required: !readOnly,
                variant: "standard",
                margin: "dense",
              },
            }}
            disablePast
            // @ts-ignore
            value={endDate}
            onChange={(value: dayjs.Dayjs | null) => {
              setEndDate(value);
            }}
            readOnly={readOnly}
          />
        </LocalizationProvider>
        <FormControl margin="dense">
          <InputLabel id="demo-multiple-checkbox-label">Accessories</InputLabel>
          <Select
            labelId="accessory-multiselect-label"
            id="accessory-multiselect"
            multiple
            value={selectedAccessories}
            onChange={handleChange}
            input={<OutlinedInput label="Accessories" />}
            renderValue={(selected) =>
              deviceAccessories
                .filter((acc) => selected.includes(acc.id))
                .map((acc) => acc.name)
                .join(", ")
            }
            margin="dense"
            required={!readOnly}
            className="!max-w-[30rem]"
            readOnly={readOnly}
          >
            {deviceAccessories.map((accessory) => (
              <MenuItem key={accessory.id} value={accessory.id}>
                <Checkbox
                  checked={selectedAccessories.indexOf(accessory.id) > -1}
                />
                <ListItemText primary={accessory.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!readOnly && (
          <div className="flex gap-2 mt-3">
            <Button variant="contained" size="medium" type="submit">
              {offer ? "Update" : "Create"}
            </Button>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => {
                onCancel();
                resetForm();
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
}
