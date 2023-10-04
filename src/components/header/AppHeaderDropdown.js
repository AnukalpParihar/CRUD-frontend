import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import noImage from "../../assets/images/noImage.png"
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUser } from '../../Store/slices/userSlice'
import { logout } from '../../Store/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const userid = localStorage.getItem("userid")
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
  async function logoutUser() {
    var item = {
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token")
    }
    var response = await dispatch(logout(item))
    if (response && response.payload && response.payload.result === "Done") {
      localStorage.clear()
      navigate("/login")
    }
    else if(response && response.payload && response.payload.result === "Fail")
      alert(response.message)
  }

  useEffect(() => {
    fetchSingleUser()
  }, [])

  return (
    <CDropdown variant="nav-item">
      {user && <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={user.pic ? `/public/user_images/${user.pic}` : noImage} size="md" />
      </CDropdownToggle>}
      <CDropdownMenu className="pt-0" placement="bottom-end">        
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={logoutUser}>
          <LogoutIcon className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
