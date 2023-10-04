import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getSingleUser } from '../../Store/slices/userSlice';
import { Link } from 'react-router-dom';
import noImage from "../../assets/images/noImage.png"

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


export default function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userid = localStorage.getItem("userid")
    const [user, setUser] = useState({})
    async function fetchSingleUser() {
        try {
            const response = await dispatch(getSingleUser(userid))
            if (response.payload.data)
                setUser(response.payload.data.data);
            else {
                alert(response.payload.data.message)
                navigate("/login")
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchSingleUser()
    }, [user.pic])

    return (
        <div className="bg-light min-vh-100 d-flex flex-row">

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {user && <TableContainer sx={{ maxHeight: "100%" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ minWidth: "50" }} className='fw-bold'>
                                    Name
                                </TableCell>
                                <TableCell style={{ minWidth: "50" }} >
                                    {user.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: "50" }} className='fw-bold'>
                                    Uesrname
                                </TableCell>
                                <TableCell style={{ minWidth: "50" }} >
                                    {user.username}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: "50" }} className='fw-bold'>
                                    Email
                                </TableCell>
                                <TableCell style={{ minWidth: "50" }} >
                                    {user.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: "50" }} className='fw-bold'>
                                    Phone
                                </TableCell>
                                <TableCell style={{ minWidth: "50" }} >
                                    {user.phone}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: "100" }} className='fw-bold'>
                                    Created At
                                </TableCell>
                                <TableCell style={{ minWidth: "100" }} >
                                    {user.created_at}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: "100" }} className='fw-bold'>
                                    Updated At
                                </TableCell>
                                <TableCell style={{ minWidth: "100" }} >
                                    {user.updated_at}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: "50" }} className='fw-bold'>
                                    Status
                                </TableCell>
                                <TableCell style={{ minWidth: "50" }} >
                                    <span style={user.status ? active : inactive}>
                                        {user.status ? 'Active' : 'Inactive'}
                                    </span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: "50" }} className='fw-bold'>
                                    Profile Pic 
                                </TableCell>
                                <TableCell style={{ minWidth: "50" }} >                              
                                <img src={user.pic ? `/public/user_images/${user.pic}` : noImage} className="rounded" style={{ width: "150px", height: "150px", border:"2px solid black" }} alt='' loading='lazy'  />:
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: "50" }} className='fw-bold' colSpan={2}>
                                    <CButton color="success" className="px-4 text-light fw-bold">
                                        <Link
                                            to="/profile/edit-profile"
                                            style={{ color: "white", textDecoration: "none" }}
                                        >
                                            <EditIcon /> Edit
                                        </Link>
                                    </CButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>}
            </Paper>


        </div>
    )
}
