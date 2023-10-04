import React from 'react'
// import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   // icon: <DashboardRoundedIcon className="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <PeopleOutlinedIcon className="nav-icon"/>,
  },
  
  {
    component: CNavItem,
    name: 'Notes',
    to: '/notes',
    icon: <LoyaltyIcon className="nav-icon"/>,
  },
]

export default _nav
