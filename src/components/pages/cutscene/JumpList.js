import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { JumpTableRow } from "./elements";

const JumpList = ({ jumpList, handleDeleteJump, handleEditJump }) => {
  const rows = useMemo(
    () =>
      Object.keys(jumpList).map((jumpName) => (
        <JumpTableRow
          key={jumpName}
          jumpName={jumpName}
          jumpPath={jumpList[jumpName]}
          handleDeleteJump={handleDeleteJump}
          handleEditJump={handleEditJump}
        />
      )),
    [jumpList, handleDeleteJump, handleEditJump]
  );

  return (
    <>
      {Object.keys(jumpList).length <= 0 && (
        <Typography align="center">No Jumps Specified</Typography>
      )}

      {Object.keys(jumpList).length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Path</TableCell>
              <TableCell padding="dense" colSpan={2} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      )}
    </>
  );
};

export default JumpList;
