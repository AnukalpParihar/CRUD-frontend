import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Profile = React.lazy(()=> import("./views/profile/Profile"))
const EditProfile = React.lazy(()=> import("./views/profile/EditProfile"))

//users
const Users = React.lazy(() => import('./views/users/Users'))
const AddUser = React.lazy(() => import('./views/users/AddUser'))
const EditUser  = React.lazy(()=>import('./views/users/EditUser'))
const User  = React.lazy(()=>import('./views/users/User'))

//brands
const Notes = React.lazy(() => import('./views/note/Notes'))
const AddNotes = React.lazy(() => import('./views/note/AddNote'))
const EditNote = React.lazy(() => import('./views/note/EditNote'))

const Widgets  =React.lazy(()=> import("./views/widgets/Widgets"))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard} ,

  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/profile/edit-profile', name: 'Edit Profile', element: EditProfile },

  { path: '/users', exact: true, name: 'All Users', element: Users },
  { path: '/users/user/:_id', exact: true, name: 'User', element: User },
  { path: '/users/add-user',  exact: true, name: 'Add New User', element: AddUser },
  { path: '/users/edit-user/:_id',  name: 'Edit User', element: EditUser },
  
  { path: '/notes', exact: true, name: 'All Notes', element: Notes },
  { path: '/notes/add-note', exact: true, name: 'Add New Note', element: AddNotes },
  { path: '/notes/edit-note/:_id', exact: true, name: 'Edit Note', element: EditNote },

  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
