import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Device } from "../../types";
import { createDevice, generateNewId } from "../../services/devices";
import DeviceForm from "./DeviceForm";

export default function CreateDeviceDialog({
  isCreateDialogopen,
  closeCreateDialog,
  handleDevicesChange,
}: {
  isCreateDialogopen: boolean;
  closeCreateDialog: () => void;
  handleDevicesChange: () => void;
}) {
  return (
    <Dialog
      open={isCreateDialogopen}
      onClose={closeCreateDialog}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const DeviceInfo = Object.fromEntries(
            (formData as any).entries()
          ) as Omit<Device, "id">;
          const device: Device = { ...DeviceInfo, id: generateNewId() };
          createDevice(device);
          handleDevicesChange();
          closeCreateDialog();
        },
      }}
    >
      <DialogTitle>Add a device</DialogTitle>
      <DialogContent>
        <DialogContentText className="!mb-3">
          Please fill out the device information below.
        </DialogContentText>
        <DeviceForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeCreateDialog}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
}
