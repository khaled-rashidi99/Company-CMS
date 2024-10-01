import { Box, Toolbar } from "@mui/material";
import OffersView from "../offers/OffersView";

function OffersPage() {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <OffersView />
      </Box>
    </>
  );
}

export default OffersPage;
