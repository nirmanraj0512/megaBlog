import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authStatus === undefined) return;
        /// Ye upar wala baaad me dale hai kyuki agar authsatus undefined hua to unncessarty navihgation hoga CHATGPT
        if (authentication && authStatus !== authentication) {
            setTimeout(() => {
                alert("⚠️ Please Log in to access this page.") // Added emoji for better alert visibility
                navigate("/login")
            }, 500);
        }
        else if (!authentication && authStatus !== authentication) {
            setTimeout(() => {
                // alert("✅ You are already logged in!") // Clearer message
                navigate("/")
            }, 500);
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return (
        loader ? (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                {/* Added a centered loader animation */}
                <div className="text-blue-600 text-2xl font-semibold animate-pulse">
                    Loading...
                </div>
            </div>
        ) : (
            <>{children}</>
        )
    )
}
