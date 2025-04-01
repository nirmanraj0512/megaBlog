import React, { forwardRef } from "react";

// Forward refrence wo hota hai ki man lo em form bana rahe hai jisme input fields hai like username password input field bhi sma ehia lekin humko uska state ka refeecne to waha par chaiye hoga uske liye humlog forward refrence ka use karte hai Enc

export default forwardRef(function Button(
  {
    children,
    type = "button",
    bgColor = "bg-blue-600", // Default button background color
    textColor = "text-white", // Default text color
    className = "",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref} // Forwarding ref to the button element
      type={type}
      className={`px-5 py-3 rounded-lg font-semibold tracking-wide transition-all duration-300 ease-in-out transform hover:scale-105 hover:opacity-90 active:scale-95 focus:ring-4 focus:ring-blue-300 ${bgColor} ${textColor} ${className}`} 
      // Added smooth hover and click animations
      // hover:scale-105 -> Slight scaling on hover
      // hover:opacity-90 -> Light opacity change on hover
      // active:scale-95 -> Shrinks slightly on click for feedback
      // focus:ring-4 -> Adds a ring effect when focused for accessibility
      {...props}
    >
      {children}
    </button>
  );
});
