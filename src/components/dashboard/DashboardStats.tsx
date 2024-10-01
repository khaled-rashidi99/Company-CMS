import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import {
  Devices as DevicesIcon,
  Headset as AccessoriesIcon,
  LocalOffer as OffersIcon,
} from "@mui/icons-material";
import StatCard from "./StatCard";

interface DashboardStatsProps {
  devicesCount: number;
  accessoriesCount: number;
  offersCount: number;
}

export default function DashboardStats({
  devicesCount,
  accessoriesCount,
  offersCount,
}: DashboardStatsProps) {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <StatCard
            title="Devices"
            value={devicesCount}
            icon={<DevicesIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Accessories"
            value={accessoriesCount}
            icon={<AccessoriesIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Offers" value={offersCount} icon={<OffersIcon />} />
        </Grid>
      </Grid>
    </Container>
  );
}
