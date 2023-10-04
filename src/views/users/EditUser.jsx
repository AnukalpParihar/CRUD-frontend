import React, { useState, useEffect } from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';
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
import { useParams } from 'react-router-dom';
import { getSingleUser, updateOneUser } from '../../Store/slices/userSlice';

export default function EditUser() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        email: '',
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
        formData.append('email', user.email);
        formData.append('pic', user.pic);
        const item = {
            _id: user._id,
            user: formData,
        };
        const response = await dispatch(updateOneUser(item));
        if (response) {
            if (response.payload.data) {
                navigate(`/users/user/${_id}`);
            } else {
                alert(response.payload.message);
            }
        }
    }

    async function fetchSingleUserData() {
        try {
            const response = await dispatch(getSingleUser(_id));
            if (response.payload.data.result === 'Done') setUser(response.payload.data.data);
            else {
                alert(response.payload.data.message);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchSingleUserData();
    }, []);

    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow>
                    <CCol md={12}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardHeader>
                                    <h5 className="text-center">Edit User Details</h5>
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
                                                        value={user.name}
                                                        onChange={(e) => {
                                                            getData(e.target.name, e.target.value);
                                                        }}
                                                    />
                                                </CInputGroup>
                                            </CCol>

                                            <CCol sm={6}>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <EmailOutlinedIcon />
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        autoComplete="email"
                                                        value={user.email}
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
                                                    Update
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
