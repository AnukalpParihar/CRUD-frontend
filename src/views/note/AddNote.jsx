import React, { useState } from 'react'
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
    CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addNote } from '../../Store/slices/noteSlice';

export default function AddBrand() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [note, setNote] = useState({
        title: "",
        description:"",
    });
    function getData(name, value) {
        setNote((oldData) => {
            return {
                ...oldData,
                [name]: value
            }
        })
    }
    async function postData() {
        var response = await dispatch(addNote(note));
        if (response && response.payload && response.payload.data) {
            if (response.payload.data.result === "Done") {
                navigate("/notes");
            }
            else if (response.payload.data.result === "Fail") {
                alert(response.payload.data.message);
            }
        } else {
            console.error("Response or its properties are undefined.");
        }
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow >
                    <CCol md={12}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardHeader>
                                    <h5 className='text-center'>Add New Note</h5>
                                </CCardHeader>
                                <CCardBody>
                                    <CForm>
                                        <CRow>
                                            <CCol sm={6}>
                                                <CInputGroup className="mb-4">
                                                    <CFormInput
                                                        type="text"
                                                        name="title"
                                                        placeholder="Note Title"
                                                        onChange={(e) => {
                                                            getData(e.target.name, e.target.value)
                                                        }}
                                                    />
                                                </CInputGroup>
                                            </CCol>
                                            <CCol sm={6}>
                                                <CInputGroup className="mb-4">
                                                    <CFormInput
                                                        type="text"
                                                        name="description"
                                                        placeholder="Descritption"
                                                        onChange={(e) => {
                                                            getData(e.target.name, e.target.value)
                                                        }}
                                                    />
                                                </CInputGroup>
                                            </CCol>
                                            <CCol sm={6}>
                                                
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol sm={12}>
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
    )
}
