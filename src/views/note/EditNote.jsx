import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getSingleNote, updateOneNote } from '../../Store/slices/noteSlice';

export default function EditBrand() {
    const { _id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [note, setNote] = useState({
        title: "",
        description: "",
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
        const item = {
            _id: _id,
            note: note
        }
        const response = await dispatch(updateOneNote(item))
        if (response) {
            if (response.payload.data) {
                navigate(`/notes`)
            }
            else {
                alert(response.payload.message)
            }
        }
    }
    async function fetchSingleNote() {
        try {
            const response = await dispatch(getSingleNote(_id))
            if (response.payload.data.result === "Done")
                setNote(response.payload.data.data);
            else {
                alert(response.payload.data.message)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchSingleNote()
    }, [])
    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow >
                    <CCol md={12}>
                        <CCardGroup>
                            {note && <CCard className="p-4">
                                <CCardHeader>
                                    <h5 className='text-center'>Edit Note Details</h5>
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
                                                        value={note.title}
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
                                                        value={note.description}
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
                                            <CCol xs={12}>
                                                <CButton color="success" className="px-4 text-light fw-bold" onClick={postData}>
                                                    Update
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>}
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}
