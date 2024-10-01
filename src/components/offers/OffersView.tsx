import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Divider,
} from "@mui/material";
import { listDevices } from "../../services/devices";
import { useState } from "react";
import { getDeviceOffer } from "../../services/offers";
import { Offer } from "../../types";
import CreateOffer from "./CreateOffer";
import EditOffer from "./EditOffer";

export default function OffersView() {
  const devices = listDevices();

  const [selectedDeviceId, setSelectedDeviceId] = useState(
    listDevices().length > 0 ? listDevices()[0].id.toString() : ""
  );

  const [offer, setOffer] = useState<Offer | null>(
    getDeviceOffer(parseInt(selectedDeviceId))
  );

  return (
    <>
      <div className="flex items-center gap-5 !min-w-full">
        <p className="text-md">Pick a Device</p>
        <FormControl className="table-head-right">
          <InputLabel id="device-select">Device</InputLabel>
          <Select
            labelId="device-select"
            id="demo-simple-select"
            value={selectedDeviceId}
            label="Device"
            onChange={(event: SelectChangeEvent) => {
              setSelectedDeviceId(event.target.value);
              setOffer(getDeviceOffer(parseInt(event.target.value)));
            }}
            renderValue={(value) =>
              devices.find((d) => d.id.toString() === value)!.name
            }
            className="!min-w-40"
          >
            {devices.map((device) => (
              <MenuItem key={device.id} value={device.id.toString()}>
                {device.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Divider className="!my-3" />
      {offer ? (
        <EditOffer
          offer={offer}
          setOffer={setOffer}
          deviceId={parseInt(selectedDeviceId)}
        />
      ) : (
        <CreateOffer
          setOffer={setOffer}
          deviceId={parseInt(selectedDeviceId)}
        />
      )}
    </>
  );
}
