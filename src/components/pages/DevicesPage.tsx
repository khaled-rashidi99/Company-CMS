import { Box, Toolbar } from "@mui/material";
import DevicesTable from "../devices/DevicesTable";

function DevicesPage() {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <DevicesTable />
      </Box>
    </>
  );
}

export default DevicesPage;
