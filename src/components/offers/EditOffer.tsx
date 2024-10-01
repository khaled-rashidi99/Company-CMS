import { Offer } from "../../types";
import { useMemo, useState } from "react";
import { listAccessories } from "../../services/accessories";
import OfferForm from "./OfferForm";
import { IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function EditOffer({
  offer,
  setOffer,
  deviceId,
}: {
  offer: Offer;
  setOffer: (offer: Offer) => void;
  deviceId: number;
}) {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const deviceAccessories = useMemo(() => {
    return listAccessories().filter((a) => a.deviceId === deviceId);
  }, [deviceId]);

  return (
    <>
      <div className="flex gap-2 !items-center my-5">
        <Typography component="h6" className="!text-lg ">
          Offer Details
        </Typography>
        <Tooltip title="Edit">
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsEditFormVisible(true);
            }}
          >
            <EditIcon className="!text-[18px]" />
          </IconButton>
        </Tooltip>
      </div>
      <OfferForm
        offer={offer}
        deviceId={deviceId}
        deviceAccessories={deviceAccessories}
        onSubmit={(offer) => {
          setOffer(offer);
          setIsEditFormVisible(false);
        }}
        onCancel={() => setIsEditFormVisible(false)}
        readOnly={!isEditFormVisible}
        mode="edit"
      />
    </>
  );
}
