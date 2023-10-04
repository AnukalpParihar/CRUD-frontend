import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { useDispatch } from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { loginUser } from '../../../Store/slices/authSlice';

const Login = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [login, setLogin] = useState({
    username: '',
    password: '',
  });

  function getData(name, value) {
    setLogin((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  }

  async function postData() {
    var item = {
      username: login.username,
      password: login.password,
    };
    var response = await dispatch(loginUser(item));
    if (response) {
      if (response.payload.result === 'Done') {
        localStorage.setItem('login', true);
        localStorage.setItem('username', response.payload.data.username);
        localStorage.setItem('name', response.payload.data.name);
        localStorage.setItem('role', response.payload.data.role);
        localStorage.setItem('userid', response.payload.data._id);
        localStorage.setItem('token', response.payload.token);

        if (response.payload.data.role === 'Admin') {
          navigate('/notes');
        } else {
          navigate('/');
        }
      } else {
        setIsInvalid(true);
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        name="username"
                        autoComplete="username"
                        onChange={(e) => {
                          getData(e.target.name, e.target.value);
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => {
                          getData(e.target.name, e.target.value);
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        {isInvalid ? (
                          <p className="text-danger fw-bold">Invalid Username or Password</p>
                        ) : null}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={postData}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    {/* Add a button to navigate to the register page */}
                    <CRow>
                      <CCol xs={12} className="mt-3">
                        <Link to="/register">
                          <CButton color="primary" className="px-4">
                            Register
                          </CButton>
                        </Link>
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
};

export default Login;
