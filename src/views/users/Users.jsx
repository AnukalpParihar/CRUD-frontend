import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllUsers, deleteOneUser } from '../../Store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditIcon from '@mui/icons-material/Edit';
import {RiUserAddLine} from 'react-icons/ri'
import "../../assets/css/style.css"
const active = {
    "color": "white",
    "backgroundColor": "#6be37e",
    "padding": "8px 10px",
    "borderRadius": "60px",
    "fontWeight": "bolder"
}
const inactive = {
    "color": "white",
    "backgroundColor": "#f06767",
    "padding": "8px 10px",
    "borderRadius": "60px",
    "fontWeight": "bolder"
}

const columns = [
    { id: 's_no', label: 'Sr', minWidth: 70 },
    { id: 'name', label: 'Name', minWidth: 130 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Phone', minWidth: 120 },
    { id: 'status', label: 'Status', minWidth: 90 },
    { id: 'action', label: 'Actions', minWidth: 180 },

];

const Users = () => {

    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    async function fetchAllUsers() {
        try {
            const response = await dispatch(getAllUsers());
            if(response && response.payload && response.payload.data && response.payload.data.result === "Done")
            setUsers(response.payload.data.data);
            else if(response && response.payload && response.payload.data && response.payload.data.result === "Fail")
            alert(response.payload.data.message);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async function deleteUser(_id) {
        if (window.confirm("Are Your Sure to Delete ?")) {
            var response = await dispatch(deleteOneUser(_id))
            response = response.data
            if (response)
                if (response.result === "Done")
                    fetchAllUsers()
                else
                    alert(response.message)
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, [users])
    return (
        <div className="container">
            <CRow className='mb-3' >
                <CCol xs={12} className='align-items-center'>
                    <Link to="/users/add-user" className='link-item'>
                     Add  <RiUserAddLine />
                    </Link>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardBody>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: "100%" }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                        className='fw-bold text-center'
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users &&
                                                users
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((user, index) => {
                                                        const s_no = index + 1;
                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                                                                {columns.map((column) => {
                                                                    const value = user[column.id];
                                                                    return (
                                                                        <TableCell
                                                                            key={column.id}
                                                                            align={column.align}
                                                                            className='text-center'
                                                                        >
                                                                            {column.id === 's_no'
                                                                                ? s_no
                                                                                : column.id === 'status' ? (
                                                                                    <span style={value ? active : inactive}>
                                                                                        {value ? 'Active' : 'Inactive'}
                                                                                    </span>
                                                                                ) : column.id === 'action' ? (
                                                                                    <span className='d-flex justify-content-center'>
                                                                                        <Button>
                                                                                            <Link
                                                                                                to={`/users/user/${user._id}`}
                                                                                                style={{ color: "#5e86f2" }}
                                                                                            >
                                                                                                <VisibilityRoundedIcon />
                                                                                            </Link>

                                                                                        </Button>
                                                                                        <Button>
                                                                                            <Link
                                                                                                to={`/users/edit-user/${user._id}`}
                                                                                                style={{ marginRight: "5px", color: "#6be37e" }}
                                                                                            >
                                                                                                <EditIcon />
                                                                                            </Link>

                                                                                        </Button>
                                                                                        <Button
                                                                                            variant='text'
                                                                                            style={{ color: "#f06767" }}
                                                                                            onClick={() => deleteUser(user._id)}
                                                                                        >
                                                                                            <DeleteIcon />
                                                                                        </Button>
                                                                                    </span>
                                                                                ) : column.format && typeof value === 'number' ? (
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
                                {users && <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={users.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />}
                            </Paper>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default Users
