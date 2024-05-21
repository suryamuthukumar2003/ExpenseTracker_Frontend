import React from 'react'
import { useCookies } from 'react-cookie';
function Logout() {
    const[cookie,setCookie,removeCookie]=useCookies();
    function handleLogout(){
        removeCookie("userID");
        removeCookie("token");  
    }
  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout;