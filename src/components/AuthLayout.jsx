import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authentication=true}){

    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector(state=>state.auth.status)

    useEffect(()=>{
        if(authStatus===undefined) return;
        ///Ye upar wala baaad me dale hai kyuki agar authsatus undefined hua to unncessarty navihgation hoga CHATGPT
        if(authentication && authStatus!==authentication){
            alert("Please Log in to access this page.")
            navigate("/login")
        }
        else if(!authentication && authStatus!==authentication){
            alert("You are already logged in")
            navigate("/")
        }
        setLoader(false )
    },[authStatus,navigate,authentication])
    return(
        loader ? <h1>Loading..</h1> :<>{children}</> 
    )
}