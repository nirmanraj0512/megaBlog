import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
      alert("Logged Out Successfully")
    })
  }

  return (
    <div>
      <button
        className='inline-block px-6 py-3 text-white font-semibold bg-red-600 rounded-full transition-all duration-300 transform hover:bg-red-700 hover:scale-105 focus:outline-none'
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  )
}

export default LogoutBtn
