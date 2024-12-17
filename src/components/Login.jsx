import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


const Login = () => {
  const[cookies,setCookie]=useCookies([]);
  const nav=useNavigate();
  const[showToggle,setShowToggle]=useState(false)
 async function handlesubmit(e){
      e.preventDefault();
      const email=document.querySelector(".email").value;
      const password=document.querySelector(".password").value;
      await fetch(`${import.meta.env.VITE_API_URL}/user/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            emailID:email,
            password:password
        })
      }).then(res=>res.json()).then(data=>{
        const {status,accessToken,userDetails}=data;
        if(status.toLowerCase()==="success"){
            setCookie('token',accessToken,{maxAge:3600})
            setCookie('userID',userDetails.userID, {maxAge:3600})
            const error=document.querySelector(".error");
            error.textContent="Login successful!!"
            error.style.display="block"

            setTimeout(()=>{
                nav('/expense')
            },1000)
        }else{
            const error=document.querySelector(".error");
            error.style.visibility="visible"
        }
      })
  }
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"100vh",width:"100%"}}>
      <div className="loginform">
    <form  id='loginform' onSubmit={handlesubmit} className='p-5'>
    <input type="email" className="email" placeholder='Enter Email'required autoComplete='off'/>
    <input type={showToggle?"text":"password"} className="password" placeholder='Enter Password' required/>
    <div style={{display:"flex"}}>
    <input type='checkbox' id='password' style={{marginRight:"5px"}} onClick={()=>setShowToggle((prev)=>!prev)} autoComplete='off'/>
    <label htmlFor='password'>Show Password</label>
    </div>
    <button type="submit" style={{width:"70%"}}>Login</button>
    <Link to="/signup">Create a new account</Link>
    <p className="error" style={{marginTop:"10px",visibility:"hidden"}}>User Not Found, Try to Register</p>
    </form>

</div>
    </div>
    
  )
}

export default Login