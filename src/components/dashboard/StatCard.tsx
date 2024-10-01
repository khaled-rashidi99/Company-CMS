import Grid from "@mui/material/Grid";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h3">{value}</Typography>
          </Grid>
          <Grid item>
            <Box sx={{ fontSize: 48, color: "primary.main" }}>{icon}</Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
