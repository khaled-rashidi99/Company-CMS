import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Device } from "../../types";
import { editDevice } from "../../services/devices";
import DeviceForm from "./DeviceForm";

export default function EditDeviceDialog({
  isEditDialogopen,
  closeEditDialog,
  handleDevicesChange,
  device,
}: {
  isEditDialogopen: boolean;
  closeEditDialog: () => void;
  handleDevicesChange: () => void;
  device: Device;
}) {
  return (
    <Dialog
      open={isEditDialogopen}
      onClose={closeEditDialog}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const DeviceInfo = Object.fromEntries(
            (formData as any).entries()
          ) as Omit<Device, "id">;
          const editedDevice: Device = { ...DeviceInfo, id: device.id };
          editDevice(editedDevice);
          handleDevicesChange();
          closeEditDialog();
        },
      }}
    >
      <DialogTitle>Edit device</DialogTitle>
      <DialogContent>
        <DialogContentText className="!mb-3">
          Please fill out the device information below.
        </DialogContentText>
        <DeviceForm device={device} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditDialog}>Cancel</Button>
        <Button type="submit">Edit</Button>
      </DialogActions>
    </Dialog>
  );
}
