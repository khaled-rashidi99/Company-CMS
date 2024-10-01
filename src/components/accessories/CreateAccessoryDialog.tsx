import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Accessory } from "../../types";
import { createAccessory, generateNewId } from "../../services/accessories";
import AccessoryForm from "./AccessoryForm";

export default function CreateAccessoryDialog({
  deviceId,
  isCreateDialogopen,
  closeCreateDialog,
  handleAccessoriesChange,
}: {
  deviceId: number;
  isCreateDialogopen: boolean;
  closeCreateDialog: () => void;
  handleAccessoriesChange: (deviceId: number) => void;
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
          const AccessoryInfo = Object.fromEntries(
            (formData as any).entries()
          ) as Omit<Accessory, "id" & "deviceId">;
          const accessory: Accessory = {
            ...AccessoryInfo,
            id: generateNewId(),
            deviceId,
          };
          createAccessory(accessory);
          handleAccessoriesChange(deviceId);
          closeCreateDialog();
        },
      }}
    >
      <DialogTitle>Add a accessory</DialogTitle>
      <DialogContent>
        <DialogContentText className="!mb-3">
          Please fill out the accessory information below.
        </DialogContentText>
        <AccessoryForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeCreateDialog}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
}
