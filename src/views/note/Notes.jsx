import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

import "../../assets/css/style.css";
import { getAllNotes, deleteOneNote } from "../../Store/slices/noteSlice";

const active = {
  color: "white",
  backgroundColor: "#6be37e",
  padding: "8px 10px",
  borderRadius: "60px",
  fontWeight: "bolder",
};
const inactive = {
  color: "white",
  backgroundColor: "#f06767",
  padding: "8px 10px",
  borderRadius: "60px",
  fontWeight: "bolder",
};

const columns = [
  { id: "s_no", label: "Sr", minWidth: 70 },
  { id: "title", label: "Name", minWidth: 130 },
  { id: "description", label: "Descritption", minWidth: 90 },
  { id: "action", label: "Actions", minWidth: 180 },
];

export default function Brands() {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function fetchAllNotes() {
    try {
      const response = await dispatch(getAllNotes());
      if (
        response &&
        response.payload &&
        response.payload.data &&
        response.payload.result === "Done"
      )
        setNotes(response.payload.data);
      else if (
        response &&
        response.payload &&
        response.payload.data &&
        response.payload.result === "Fail"
      )
        alert(response.payload.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function deleteNote(_id) {
    if (window.confirm("Are Your Sure to Delete ?")) {
      var response = await dispatch(deleteOneNote(_id));
      console.log(response);
      if (response.payload.result === "Done") 
        fetchAllNotes();
      else 
        alert(response.payload.message);
    }
  }
  useEffect(() => {
    fetchAllNotes();
  }, [notes]);
  return (
    <div className="container">
      <CRow className="mb-3">
        <CCol xs={12} className="align-items-center">
          <Link to="/notes/add-note" className="link-item">
            Add <LoyaltyIcon />
          </Link>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            className="fw-bold text-center"
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {notes &&
                        notes
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((note, index) => {
                            let s_no = index + 1;

                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={note._id}
                              >
                                {columns.map((column) => {
                                  const value = note[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      className="text-center"
                                    >
                                      {column.id === "s_no" ? (
                                        s_no
                                      ) : column.id === "status" ? (
                                        <span style={value ? active : inactive}>
                                          {value ? "Active" : "Inactive"}
                                        </span>
                                      ) : column.id === "action" ? (
                                        <span className="d-flex justify-content-center">
                                          <Button>
                                            <Link
                                              to={`/notes/edit-note/${note._id}`}
                                              style={{
                                                marginRight: "5px",
                                                color: "#6be37e",
                                              }}
                                            >
                                              <EditIcon />
                                            </Link>
                                          </Button>
                                          <Button
                                            variant="text"
                                            style={{ color: "#f06767" }}
                                            onClick={() => deleteNote(note._id)}
                                          >
                                            <DeleteIcon />
                                          </Button>
                                        </span>
                                      ) : column.format &&
                                        typeof value === "number" ? (
                                        <>{column.format(value)}</>
                                      ) : (
                                        value
                                      )}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {notes && (
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={notes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                )}
              </Paper>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}
