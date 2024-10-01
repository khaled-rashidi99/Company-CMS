import { Box, Toolbar } from "@mui/material";
import AccessoriesTable from "../accessories/AccessoriesTable";

function AccessoriesPage() {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <AccessoriesTable />
      </Box>
    </>
  );
}

export default AccessoriesPage;
