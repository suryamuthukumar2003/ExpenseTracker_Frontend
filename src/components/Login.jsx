import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


const Login = () => {
  const[cookies,setCookie]=useCookies([]);
  const nav=useNavigate();
 async function handlesubmit(e){
      e.preventDefault();
      const email=document.querySelector(".email").value;
      const password=document.querySelector(".password").value;
      await fetch('http://localhost:8000/user/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            emailID:email,
            password:password
        })
      }).then(res=>res.json()).then(data=>{
        console.log(data)
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
            error.style.display="block"
        }
      })
  }
  return (
    <div className="loginform">
    <form  id='loginform' onSubmit={handlesubmit}>
    <input type="email" className="email" placeholder='Enter Email'required/>
    <input type="password" className="password" placeholder='Enter
Password' required/>
    <button type="submit">Login</button>
    <Link to="/signup">Create a new account</Link>
    <p className="error" style={{marginTop:"10px"}}>User Not Found, Try to Register</p>
    </form>

</div>
  )
}

export default Login