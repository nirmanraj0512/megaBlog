import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}

// Forward refrence wo hota hai ki man lo em form bana rahe hai jisme input fields hai like username password input field bhi sma ehia lekin humko uska state ka refeecne to waha par chaiye hoga uske liye humlog forward refrence ka use karte hai