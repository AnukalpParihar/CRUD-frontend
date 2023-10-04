// AppSidebar.js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'
import { setSidebarShow } from '../Store/slices/sidebarSlice'
import { logoNegative } from '../assets/brand/logo-negative'
import { sygnet } from '../assets/brand/sygnet'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setSidebarShow(visible))
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(setSidebarShow(!sidebarShow))} // Toggle the 'sidebarShow' value
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)




// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { AppSidebarNav } from './AppSidebarNav'
// import { setSidebarShow } from '../Store/slices/sidebarSlice'
// import { logoNegative } from '../assets/brand/logo-negative'
// import { sygnet } from '../assets/brand/sygnet'
// import SimpleBar from 'simplebar-react'
// import 'simplebar/dist/simplebar.min.css'
// // sidebar nav config
// import navigation from '../_nav'

// const AppSidebar = () => {
//   const dispatch = useDispatch()
//   const unfoldable = useSelector((state) => state.sidebarUnfoldable) 
//   const sidebarShow = useSelector((state) => state.sidebar.sidebarShow) 
//   // Add a missing argument to setSidebarShow action

//   return (
//     <CSidebar
//       position="fixed"
//       unfoldable={unfoldable}
//       visible={sidebarShow}
//       onVisibleChange={(visible) => {
//         dispatch(setSidebarShow(visible)) // Fix: Pass 'visible' as an argument
//       }}
//     >
//       <CSidebarBrand className="d-none d-md-flex" to="/">
//         <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
//         <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
//       </CSidebarBrand>
//       <CSidebarNav>
//         <SimpleBar>
//           <AppSidebarNav items={navigation} />
//         </SimpleBar>
//       </CSidebarNav>
//       <CSidebarToggler
//         className="d-none d-lg-flex"
//         onClick={() => dispatch(setSidebarShow(!visible))} // Fix: Toggle the 'sidebarShow' value
//       />
//     </CSidebar>
//   )
// }

// export default React.memo(AppSidebar)



// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'

// import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

// import { AppSidebarNav } from './AppSidebarNav'
// import { setSidebarShow } from '../Store/slices/sidebarSlice'
// import { logoNegative } from '../assets/brand/logo-negative'
// import { sygnet } from '../assets/brand/sygnet'

// import SimpleBar from 'simplebar-react'
// import 'simplebar/dist/simplebar.min.css'

// // sidebar nav config
// import navigation from '../_nav'

// const AppSidebar = () => {
//   const dispatch = useDispatch()
//   const unfoldable = useSelector((state) => {state.sidebarUnfoldable})
//   const sidebarShow = useSelector((state) => state.sidebarShow)

//   return (
//     <CSidebar
//       position="fixed"
//       unfoldable={unfoldable}
//       visible={sidebarShow}
//       onVisibleChange={(visible) => {
//         dispatch(setSidebarShow())
//       }}
//     >
//       <CSidebarBrand className="d-none d-md-flex" to="/">
//         <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
//         <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
//       </CSidebarBrand>
//       <CSidebarNav>
//         <SimpleBar>
//           <AppSidebarNav items={navigation} />
//         </SimpleBar>
//       </CSidebarNav>
//       <CSidebarToggler
//         className="d-none d-lg-flex"
//         onClick={() => dispatch(setSidebarShow(false))}
//       />
//     </CSidebar>
//   )
// }

// export default React.memo(AppSidebar)
