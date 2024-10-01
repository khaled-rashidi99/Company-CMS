import { listDevices } from "../../services/devices";
import { listAccessories } from "../../services/accessories";
import { listOffers } from "../../services/offers";
import DashboardStats from "./DashboardStats";

export default function Dashboard() {
  const devicesCount = listDevices().length;
  const accessoriesCount = listAccessories().length;
  const offersCount = listOffers().length;

  return (
    <div>
      <DashboardStats
        devicesCount={devicesCount}
        accessoriesCount={accessoriesCount}
        offersCount={offersCount}
      />
    </div>
  );
}
