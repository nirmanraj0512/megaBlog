import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import { Header,Footer, Login} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])


  return !loading ?(
    <div className='min-h-screen flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        {/* //ye line ChatGpt se nikale hai iska mtl;b nhai ki ye routung karta hai as per main.jsx */}
      <main className="container mx-auto p-4">
        <Outlet /> {/* This renders the child components for nested routes */}
      </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
