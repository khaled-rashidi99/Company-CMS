import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Device } from "../../types";
import { deleteDevice, listDevices } from "../../services/devices";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import CreateDeviceDialog from "./CreateDeviceDialog";
import EditDeviceDialog from "./EditDeviceDialog";

interface HeadCell {
  id: keyof Device;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "image",
    label: "Image",
  },
  {
    id: "manufactureDate",
    label: "Release Date",
  },
  {
    id: "ramSizeGB",
    label: "RAM (GB)",
  },
  {
    id: "storageSizeGB",
    label: "Storage (GB)",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" align="center">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="center" padding="normal">
            {headCell.label}
          </TableCell>
        ))}
        <TableCell padding="normal" align="center">
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({
  numSelected,
  selectedIds,
  resetSelections,
  handleDevicesChange,
}: {
  numSelected: number;
  selectedIds: readonly number[];
  resetSelections: () => void;
  handleDevicesChange: () => void;
}) {
  const [isCreateDialogopen, setIsCreateDialogOpen] = useState(false);

  const openCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <div className="flex items-center justify-center">
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Devices
          </Typography>
          <IconButton aria-label="add" onClick={() => openCreateDialog()}>
            <AddCircleIcon />
          </IconButton>
          <CreateDeviceDialog
            isCreateDialogopen={isCreateDialogopen}
            closeCreateDialog={closeCreateDialog}
            handleDevicesChange={handleDevicesChange}
          />
        </div>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              selectedIds.forEach((id) => deleteDevice(id));
              resetSelections();
              handleDevicesChange();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function DevicesTable() {
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState(listDevices());
  const [editableDevice, setEditableDevice] = useState<Device | undefined>(
    undefined
  );
  const [isEditDialogopen, setIsEditDialogOpen] = useState(false);

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const rowsPerPage = 5;

  const handleDevicesChange = () => {
    setRows(listDevices());
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () => [...rows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedIds={selected}
          resetSelections={() => setSelected([])}
          handleDevicesChange={handleDevicesChange}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox" align="center">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={row.image}
                        alt={row.name}
                        className="mx-auto max-w-40 h-auto"
                      />
                    </TableCell>
                    <TableCell align="center">{row.manufactureDate}</TableCell>
                    <TableCell align="center">{row.ramSizeGB}</TableCell>
                    <TableCell align="center">{row.storageSizeGB}</TableCell>
                    <TableCell
                      align="center"
                      className="flex justify-center items-center"
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setEditableDevice(row);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteDevice(row.id);
                            handleDevicesChange();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={5}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
        />
      </Paper>
      {editableDevice && (
        <EditDeviceDialog
          isEditDialogopen={isEditDialogopen}
          closeEditDialog={closeEditDialog}
          handleDevicesChange={handleDevicesChange}
          device={editableDevice}
        />
      )}
    </Box>
  );
}
