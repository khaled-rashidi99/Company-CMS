import Button from "@mui/material/Button";
import { Offer } from "../../types";
import { useMemo, useState } from "react";
import { listAccessories } from "../../services/accessories";
import OfferForm from "./OfferForm";

export default function CreateOffer({
  setOffer,
  deviceId,
}: {
  setOffer: (offer: Offer) => void;
  deviceId: number;
}) {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

  const deviceAccessories = useMemo(() => {
    return listAccessories().filter((a) => a.deviceId === deviceId);
  }, [deviceId]);

  return (
    <>
      {!isCreateFormVisible ? (
        <div className="flex items-center">
          <p>No offer on this device.</p>
          <Button
            size="large"
            className="!capitalize !px-2"
            onClick={() => setIsCreateFormVisible(true)}
          >
            Create Offer
          </Button>
        </div>
      ) : (
        <OfferForm
          deviceId={deviceId}
          deviceAccessories={deviceAccessories}
          onSubmit={(offer) => setOffer(offer)}
          onCancel={() => setIsCreateFormVisible(false)}
          mode="create"
        />
      )}
    </>
  );
}
