import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCardHeader,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { addUser } from '../../Store/slices/userSlice';

export default function AddUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        pic: '',
    });

    function getData(name, value) {
        setUser((oldData) => {
            return {
                ...oldData,
                [name]: value,
            };
        });
    }

    function getFile(name, file) {
        setUser((oldData) => {
            return {
                ...oldData,
                [name]: file,
            };
        });
    }

    async function postData() {
        var formData = new FormData();
        formData.append('name', user.name);
        formData.append('username', user.username);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('pic', user.pic);

        var response = await dispatch(addUser(formData));
        console.log(response);

        if (response && response.payload && response.payload.data) {
            if (response.payload.data.result === 'Done') {
                navigate('/users');
            } else if (response.payload.data.result === 'Fail') {
                alert(response.payload.data.message);
            }
        } else {
            // Handle the case where response or its properties are undefined.
            console.error('Response or its properties are undefined.');
        }
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow>
                    <CCol md={12}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardHeader>
                                    <h5 className="text-center">Add New User Details</h5>
                                </CCardHeader>
                                <CCardBody>
                                    <CForm>
                                        <CRow>
                                            <CCol sm={6}>
                                                <CInputGroup className="mb-4">
                                                    <CInputGroupText>
                                                        <PermIdentityOutlinedIcon />
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        type="text"
                                                        name="name"
                                                        placeholder="Name"
                                                        autoComplete="name"
                                                        onChange={(e) => {
                                                            getData(e.target.name, e.target.value);
                                                        }}
                                                    />
                                                </CInputGroup>
                                            </CCol>
                                            <CCol sm={6}>
                                                <CInputGroup className="mb-4">
                                                    <CInputGroupText>
                                                        <AccountCircleOutlinedIcon />
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        type="text"
                                                        name="username"
                                                        placeholder="Username"
                                                        onChange={(e) => {
                                                            getData(e.target.name, e.target.value);
                                                        }}
                                                    />
                                                </CInputGroup>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol sm={6}>
                                                <CInputGroup className="mb-4">
                                                    <CInputGroupText>
                                                        <EmailOutlinedIcon />
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        autoComplete="email"
                                                        onChange={(e) => {
                                                            getData(e.target.name, e.target.value);
                                                        }}
                                                    />
                                                </CInputGroup>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol sm={6}>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <LockOutlinedIcon />
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        type="password"
                                                        placeholder="Password"
                                                        name="password"
                                                        onChange={(e) => {
                                                            getData(e.target.name, e.target.value);
                                                        }}
                                                    />
                                                </CInputGroup>
                                            </CCol>
                                            <CCol sm={6}>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <LockOutlinedIcon />
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        name="password"
                                                        onChange={(e) => {
                                                            getData(e.target.name, e.target.value);
                                                        }}
                                                    />
                                                </CInputGroup>
                                            </CCol>
                                        </CRow>

                                        <CRow>
                                            <CCol sm={12}>
                                                <CInputGroup className="mb-3">
                                                    <CFormInput
                                                        type="file"
                                                        name="pic"
                                                        onChange={(e) => {
                                                            getFile(e.target.name, e.target.files[0]);
                                                        }}
                                                    />
                                                </CInputGroup>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CButton color="success" className="px-4 text-light fw-bold" onClick={postData}>
                                                    Add
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}
