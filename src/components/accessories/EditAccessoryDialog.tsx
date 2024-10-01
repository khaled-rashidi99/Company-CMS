import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Accessory } from "../../types";
import { editAccessory } from "../../services/accessories";
import AccessoryForm from "./AccessoryForm";

export default function EditAccessoryDialog({
  isEditDialogopen,
  closeEditDialog,
  handleAccessoriesChange,
  accessory,
}: {
  isEditDialogopen: boolean;
  closeEditDialog: () => void;
  handleAccessoriesChange: (deviceId: number) => void;
  accessory: Accessory;
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
          const AccessoryInfo = Object.fromEntries(
            (formData as any).entries()
          ) as Omit<Accessory, "id" & "deviceId">;
          const editedAccessory: Accessory = {
            ...AccessoryInfo,
            id: accessory.id,
            deviceId: accessory.deviceId,
          };
          editAccessory(editedAccessory);
          handleAccessoriesChange(accessory.deviceId);
          closeEditDialog();
        },
      }}
    >
      <DialogTitle>Edit accessory</DialogTitle>
      <DialogContent>
        <DialogContentText className="!mb-3">
          Please fill out the accessory information below.
        </DialogContentText>
        <AccessoryForm accessory={accessory} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditDialog}>Cancel</Button>
        <Button type="submit">Edit</Button>
      </DialogActions>
    </Dialog>
  );
}
